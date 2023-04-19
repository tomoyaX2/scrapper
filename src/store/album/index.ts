import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { NextRouter } from 'next/router';
import { RootState } from '..';
import { AlbumState, Image } from './types';

const initialState: AlbumState = {
  id: '',
  images: [],
  downloadPath: '',
  title: '',
  currentRate: 0
};

export const getAlbumRate = createAsyncThunk(
  'get rate',
  async ({ albumId }: { albumId: string }) => {
    try {
      const res = await axios.get<{ rate: number }>(
        `${backendUrl}/albums/${albumId}/rate`
      );

      return res.data;
    } catch (e) {
      console.log(e);
      return { rate: 0 };
    }
  }
);

export const rateAlbum = createAsyncThunk(
  'rate album',
  async ({ albumId, rate }: { albumId: string; rate: number }) => {
    await axios.post(`${backendUrl}/albums/${albumId}/rate`, { rate });
  }
);

export const downloadAlbum = async (album: AlbumState) => {
  const link = document.createElement('a');
  link.href = album.downloadPath;
  link.setAttribute('download', `${album.title}.zip`); //or any other extension
  document.body.appendChild(link);
  link.click();
};

export const getAlbum = createAsyncThunk(
  'get album',
  async (router: NextRouter, store) => {
    try {
      const res = await axios.get<AlbumState>(
        `${backendUrl}/albums/${router.query.id as string}`
      );
      store.dispatch(
        getAlbumImages({
          albumId: router.query.id as string,
          page: 1,
          redirectOnError: async () => router.push('/')
        })
      );
      return res.data;
    } catch (e) {
      console.log('123131213');
      router.push('/');
      return {};
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  'delete album',
  async (albumId: string) => {
    await axios.delete(`${backendUrl}/albums/${albumId}`);
  }
);

export const getAlbumImages = createAsyncThunk(
  'get images',
  async ({
    albumId,
    redirectOnError
  }: {
    albumId: string;
    page: number;
    redirectOnError: () => {};
  }) => {
    try {
      const res = await axios.get<{ data: Image[] }>(
        `${backendUrl}/image?albumId=${albumId}`
      );
      return res.data.data;
    } catch (e) {
      redirectOnError();
      return [];
    }
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAlbum.fulfilled, (state, action) => {
      if (action.payload) {
        const fields = keys(action.payload);
        for (const field of fields) {
          state[field] = action.payload[field];
        }
      }
    });
    builder.addCase(
      getAlbumImages.fulfilled,
      (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
      }
    );
    builder.addCase(
      getAlbumRate.fulfilled,
      (state, action: PayloadAction<{ rate: number }>) => {
        state.currentRate = action.payload.rate;
      }
    );
  }
});
export default albumsSlice.reducer;

export const selectAlbumsState = (state: RootState) => state.albums;
