import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { RootState } from '..';
import { ReaderPage, Image } from './types';

const initialState: ReaderPage = {
  currentPage: 0,
  images: [],
  pagesList: []
};

export const getReaderImages = createAsyncThunk(
  'get images list',
  async (albumId: string) => {
    const res = await axios.get<{ data: Image[] }>(
      `${backendUrl}/image?albumId=${albumId}`
    );
    return res.data.data;
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
      getReaderImages.fulfilled,
      (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;

        state.pagesList = Array.from(Array(action.payload?.length).keys()).map(
          key => ({
            label: key + 1,
            value: key
          })
        );
      }
    )
});

export const { changeReaderPage } = readerSlice.actions;
export default readerSlice.reducer;

export const selectAlbumsState = (state: RootState) => state.albums;
