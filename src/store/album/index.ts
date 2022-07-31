import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { RootState } from '..';
import { AlbumState, Image } from './types';

const initialState: AlbumState = {
  id: '',
  images: [],
  downloadPath: '',
  title: ''
};

export const downloadAlbum = async (album: AlbumState) => {
  const link = document.createElement('a');
  link.href = album.downloadPath;
  link.setAttribute('download', `${album.title}.zip`); //or any other extension
  document.body.appendChild(link);
  link.click();
};

export const getAlbum = createAsyncThunk(
  'get album',
  async (albumId: string) => {
    const res = await axios.get<AlbumState>(`${backendUrl}/albums/${albumId}`);
    return res.data;
  }
);

export const getAlbumImages = createAsyncThunk(
  'get images',
  async ({ albumId }: { albumId: string; page: number }) => {
    const res = await axios.get<{ data: Image[] }>(
      `${backendUrl}/image?albumId=${albumId}`
    );
    return res.data.data;
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getAlbum.fulfilled,
      (state, action: PayloadAction<AlbumState>) => {
        const fields = keys(action.payload);
        for (const field of fields) {
          //@ts-expect-error shit happens
          state[field] = action.payload[field];
        }
      }
    );
    builder.addCase(
      getAlbumImages.fulfilled,
      (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
      }
    );
  }
});
export default albumsSlice.reducer;

export const selectAlbumsState = (state: RootState) => state.albums;
