import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { RootState } from '..';
import { AlbumComment, AlbumState, Image } from './types';

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
      return { rate: 0 };
    }
  }
);

export const rateAlbum = createAsyncThunk(
  'rate album',
  async ({ albumId, rate }: { albumId: string; rate: number }, store) => {
    await axios.post(`${backendUrl}/albums/${albumId}/rate`, { rate });
    store.dispatch(getAlbum({ albumId, preventReloadImages: true }));
    store.dispatch(getAlbumRate({ albumId }));
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
  async (
    {
      albumId,
      onError,
      preventReloadImages
    }: { albumId: string; onError?: () => void; preventReloadImages?: boolean },
    store
  ) => {
    try {
      const res = await axios.get<AlbumState>(
        `${backendUrl}/albums/${albumId}`
      );
      if (!preventReloadImages) {
        store.dispatch(
          getAlbumImages({
            albumId: albumId,
            page: 1
          })
        );
      }
      return res.data;
    } catch (e) {
      onError?.();
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
  async ({ albumId }: { albumId: string; page: number }) => {
    try {
      const res = await axios.get<{ data: Image[] }>(
        `${backendUrl}/image?albumId=${albumId}`
      );
      return res.data.data;
    } catch (e) {
      return [];
    }
  }
);

export const getComments = createAsyncThunk(
  'get comments',
  async ({ albumId }: { albumId: string }) => {
    try {
      const res = await axios.get<{ data: AlbumComment[] }>(
        `${backendUrl}/comments?page=1&perPage=1000&albumId=${albumId}`
      );
      return res.data.data;
    } catch (e) {
      return [];
    }
  }
);

export const sendComment = createAsyncThunk(
  'send comment',
  async ({ albumId, text }: { albumId: string; text: string }, store) => {
    try {
      await axios.post(`${backendUrl}/comments`, {
        albumId,
        text
      });
      store.dispatch(getComments({ albumId }));
    } catch (e) {
      return [];
    }
  }
);

export const deleteComment = createAsyncThunk(
  'delete comment',
  async (
    { albumId, commentId }: { albumId: string; commentId: string },
    store
  ) => {
    try {
      await axios.delete(`${backendUrl}/comments/${commentId}/${albumId}`);
      store.dispatch(getComments({ albumId }));
    } catch (e) {
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
          if (field !== 'images') {
            // image is comming in another request due to perfomance reasons
            state[field] = action.payload[field];
          }
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
    builder.addCase(
      getComments.fulfilled,
      (state, action: PayloadAction<AlbumComment[]>) => {
        state.comments = action.payload;
      }
    );
  }
});
export default albumsSlice.reducer;

export const selectAlbumsState = (state: RootState) => state.albums;
