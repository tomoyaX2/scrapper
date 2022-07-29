import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { SeriesModel, SeriesState } from './types';

const initialState: SeriesState = {
  seriesList: [],
  page: 1,
  perPage: 50,
  visibleSeries: []
};

export const getSeries = createAsyncThunk('get series', async () => {
  const series = await axios.get<PaginatedResponse<SeriesModel>>(
    `${backendUrl}/series`
  );

  return series.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const seriesSlice = createSlice({
  name: 'serires',
  initialState,
  reducers: {
    incrementSeriesPage: state => {
      const nextPage = state.page + 1;
      const pevPage = state.page - 1;
      const startOfVisibleItems = nextPage > 2 ? pevPage * state.perPage : 0;
      const isSameAmountOfItems =
        state.visibleSeries.length === state.seriesList.length;

      state.page = isSameAmountOfItems ? state.page : nextPage;

      state.visibleSeries = isSameAmountOfItems
        ? state.visibleSeries
        : state.seriesList.slice(startOfVisibleItems, nextPage * state.perPage);
    },
    decrementSeriesPage: state => {
      const isSecondPage = state.page === 2;

      state.page = isSecondPage ? state.page : state.page - 1;

      state.visibleSeries = isSecondPage
        ? state.seriesList.slice(0, state.perPage * 2)
        : state.seriesList.slice(
            (state.page - 2) * state.perPage,
            state.page * state.perPage
          );
    },
    resetSeriesPage: state => {
      state.page = 1;
      state.visibleSeries = state.seriesList.slice(0, state.perPage);
    },
    onSearchSeries: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.visibleSeries = state.seriesList.filter(el =>
        el.label.startsWith(action.payload)
      );
    }
  },
  extraReducers: builder =>
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.seriesList = action.payload;
      state.visibleSeries = action.payload.slice(0, state.perPage);
    })
});

export const {
  incrementSeriesPage,
  decrementSeriesPage,
  resetSeriesPage,
  onSearchSeries
} = seriesSlice.actions;

export default seriesSlice.reducer;
