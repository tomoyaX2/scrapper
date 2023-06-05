import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { keys } from '@shared/utils/keys';
import axios from 'axios';
import { VideoComment, VideoState } from './types';

const initialState: VideoState = {
  id: '',
  title: '',
  currentRate: 0,
  episodes: []
};

export const getVideoRate = createAsyncThunk(
  'get video rate',
  async ({ videoId }: { videoId: string }) => {
    try {
      const res = await axios.get<{ rate: number }>(
        `${backendUrl}/videos/${videoId}/rate`
      );

      return res.data;
    } catch (e) {
      return { rate: 0 };
    }
  }
);

export const rateVideo = createAsyncThunk(
  'rate  video',
  async ({ videoId, rate }: { videoId: string; rate: number }, store) => {
    await axios.post(`${backendUrl}/videos/${videoId}/rate`, { rate });
    store.dispatch(getVideo({ videoId, preventReloadImages: true }));
    store.dispatch(getVideoRate({ videoId }));
  }
);

// export const downloadVideo = async (video: VideoState) => {
//   const link = document.createElement('a');
//   link.href = video.downloadPath;
//   link.setAttribute('download', `${video.title}.zip`); //or any other extension
//   document.body.appendChild(link);
//   link.click();
// };

export const getVideo = createAsyncThunk(
  'get video',
  async ({
    videoId,
    onError
  }: {
    videoId: string;
    onError?: () => void;
    preventReloadImages?: boolean;
  }) => {
    try {
      const res = await axios.get<VideoState>(
        `${backendUrl}/videos/${videoId}`
      );
      return res.data;
    } catch (e) {
      onError?.();
      return {};
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'delete video',
  async (videoId: string) => {
    await axios.delete(`${backendUrl}/video/${videoId}`);
  }
);

export const getVideoComments = createAsyncThunk(
  'get video comments',
  async ({ videoId }: { videoId: string }) => {
    try {
      const res = await axios.get<{ data: VideoComment[] }>(
        `${backendUrl}/comments?page=1&perPage=1000&videoId=${videoId}`
      );
      return res.data.data;
    } catch (e) {
      return [];
    }
  }
);

export const sendVideoComment = createAsyncThunk(
  'send video comment',
  async ({ videoId, text }: { videoId: string; text: string }, store) => {
    try {
      await axios.post(`${backendUrl}/video-comments`, {
        videoId,
        text
      });
      store.dispatch(getVideoComments({ videoId }));
    } catch (e) {
      return [];
    }
  }
);

export const deleteVideoComment = createAsyncThunk(
  'delete video comment',
  async (
    { videoId, commentId }: { videoId: string; commentId: string },
    store
  ) => {
    try {
      await axios.delete(
        `${backendUrl}/video-comments/${commentId}/${videoId}`
      );
      store.dispatch(getVideoComments({ videoId }));
    } catch (e) {
      return [];
    }
  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVideo.fulfilled, (state, action) => {
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
      getVideoRate.fulfilled,
      (state, action: PayloadAction<{ rate: number }>) => {
        state.currentRate = action.payload.rate;
      }
    );
    builder.addCase(
      getVideoComments.fulfilled,
      (state, action: PayloadAction<VideoComment[]>) => {
        state.comments = action.payload;
      }
    );
  }
});
export default videoSlice.reducer;
