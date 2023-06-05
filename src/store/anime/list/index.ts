import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { AnimeState, AlbumResponse, Search } from './types';

const initialState: AnimeState = {
  data: [],
  total: 0,
  isLoading: false,
  search: {
    page: 1,
    perPage: 20
  }
};

export const getAnimeList = createAsyncThunk(
  'get anime',
  async (body: { page: number; perPage: number }) => {
    const response = await axios.get<AlbumResponse>(
      `${backendUrl}/videos?page=${body.page}&perPage=${body.perPage}`
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
    changeSearchState: (state, action: PayloadAction<Search>) => {
      state.search.page = action.payload.page;
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
