import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { AnimeState, AnimeResponse, Search } from './types';

const initialState: AnimeState = {
  data: [],
  total: 0,
  isLoading: false,
  search: {
    page: 1,
    perPage: 20,
    shouldResetPage: false
  }
};

export const getAnimeList = createAsyncThunk(
  'get anime',
  async (body: Record<string, string[] | string | number | boolean>) => {
    const response = await axios.post<AnimeResponse>(
      `${backendUrl}/videos/search`,
      body
    );

    return response.data;
  }
);

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    resetAnimeState: state => {
      state.data = [];
      state.total = 0;
      state.isLoading = true;
    },
    // changeSearchState: (state, action: PayloadAction<Search>) => {
    //   state.search.page = action.payload.page;
    // }
    changeSearchState: (state, action: PayloadAction<Search>) => {
      for (const searchKey of keys(state.search)) {
        //@ts-expect-error cause of i need
        state.search[searchKey] = null;
      }
      state.search.page = action.payload.page;
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
  extraReducers: builder =>
    builder.addCase(getAnimeList.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = parseInt(action.payload.total);
      state.isLoading = false;
    })
});
export default animeSlice.reducer;
export const { resetAnimeState, changeSearchState } = animeSlice.actions;
