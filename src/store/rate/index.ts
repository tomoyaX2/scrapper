import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RateState } from './types';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { AppDispatch } from '..';

const initialState: RateState = {
  rate: 1
};

export const rateAlbum = createAsyncThunk(
  'rate album',
  async ({ albumId, rate }: { albumId: string; rate: number }) => {
    const accessToken = localStorage.getItem('accessToken') ?? '';

    await axios.post(
      `${backendUrl}/albums/${albumId}/rate`,
      { rate },
      {
        headers: { access_token: accessToken }
      }
    );
  }
);

export const getAlbumRate = createAsyncThunk(
  'get rate',
  async ({ albumId, dispatch }: { albumId: string; dispatch: AppDispatch }) => {
    try {
      const accessToken = localStorage.getItem('accessToken') ?? '';

      const res = await axios.get<{ rate: number }>(
        `${backendUrl}/albums/${albumId}/rate`,
        {
          headers: { access_token: accessToken }
        }
      );

      dispatch(rateSlice.actions.gettingRateSuccess(res.data.rate));
      return res.data.rate;
    } catch (e) {
      console.log(e);
      return {};
    }
  }
);

export const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    gettingRateSuccess(state, action: PayloadAction<number>) {
      state.rate = action.payload;
    }
  },
  extraReducers: {}
});

export default rateSlice.reducer;
