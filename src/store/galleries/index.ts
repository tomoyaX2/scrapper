import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { Gallery, GalleryState } from './types';

const initialState: GalleryState = {
  galleryList: [],
  isLoading: true
};

export const getGalleries = createAsyncThunk('get galleries', async () => {
  const galleries = await axios.get<Gallery[]>(`${backendUrl}/gallery`);

  return galleries.data;
});

export const createGallery = createAsyncThunk(
  'create gallery',
  async (name: string) => {
    await axios.post(`${backendUrl}/gallery`, { name });
  }
);

export const addToGallery = createAsyncThunk(
  'add to gallery',
  async (body: { galleryId: string; albumId: string }) => {
    await axios.patch(`${backendUrl}/gallery/add-album`, body);
  }
);

export const removeFromGallery = createAsyncThunk(
  'remove from gallery',
  async (body: { galleryId: string; albumId: string }) => {
    await axios.patch(`${backendUrl}/gallery/remove-album`, body);
  }
);

export const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getGalleries.fulfilled, (state, action) => {
      state.galleryList = action.payload;
      state.isLoading = false;
    })
});

export default galleriesSlice.reducer;
