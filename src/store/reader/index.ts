import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { RootState } from '..';
import { AlbumState } from '../album/types';
import { ReaderPage } from './types';

const initialState: ReaderPage = {
  currentPage: 1,
  images: [],
  pagesList: []
};

export const getAlbum = createAsyncThunk(
  'get album',
  async (albumId: string) => {
    const res = await axios.get<AlbumState>(`${backendUrl}/albums/${albumId}`);
    return res.data;
  }
);

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    changeReaderPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder =>
    builder.addCase(
      getAlbum.fulfilled,
      (state, action: PayloadAction<AlbumState>) => {
        state.images = action.payload.images;

        state.pagesList = Array.from(
          Array(action.payload?.images?.length).keys()
        ).map(key => ({
          label: key + 1,
          value: key + 1
        }));
      }
    )
});

export const { changeReaderPage } = readerSlice.actions;
export default readerSlice.reducer;

export const selectAlbumsState = (state: RootState) => state.albums;
