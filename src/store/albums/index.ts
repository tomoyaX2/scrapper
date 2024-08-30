import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { RootState } from '..';
import { AlbumsState, AlbumResponse, Search } from './types';

const initialState: AlbumsState = {
  data: [],
  total: 0,
  isLoading: false,
  search: {
    page: 1,
    perPage: 20,
    shouldResetPage: false
  }
};

export const getAlbums = createAsyncThunk(
  'get albums',
  async (body: Record<string, string[] | string | number | boolean>) => {
    const response = await axios.post<AlbumResponse>(
      `${backendUrl}/albums/search`,
      body?.sortBy
        ? { ...body, sortBy: { [body.sortBy as string]: 'DESC' } }
        : body
    );

    return response.data;
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    resetAlbumState: state => {
      state.data = [];
      state.total = 0;
      state.isLoading = true;
    },
    changeSearchState: (state, action: PayloadAction<Search>) => {
      for (const searchKey of keys(state.search)) {
        //@ts-expect-error cause of i need
        state.search[searchKey] = null;
      }
      state.search.page = 1;
      state.search.perPage = 20;
      state.search.shouldResetPage = false;
      const searchKeys = Object.keys(
        action.payload
      ) as unknown as (keyof Search)[];

      for (const searchKey of searchKeys) {
        if (action.payload[searchKey]) {
          //@ts-expect-error cause of i need
          state.search[searchKey] = action.payload[searchKey];
        }
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = parseInt(action.payload.total);
      state.isLoading = false;
    });
    builder.addCase(getAlbums.pending, state => {
      state.isLoading = true;
    });
  }
});
export default albumsSlice.reducer;
export const { resetAlbumState, changeSearchState } = albumsSlice.actions;

export const selectAlbumsState = (state: RootState) => state.albums;
