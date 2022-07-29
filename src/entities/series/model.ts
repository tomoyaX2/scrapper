import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';
import { backendUrl } from '@shared/api';
import type { PaginatedResponse } from '@shared/types/responses';

type Series = {
  value: string;
  label: string;
};

type SeriesModel = {
  id: string;
  name: string;
};

type SeriesState = {
  seriesList: Series[];
  page: number;
  perPage: number;
  visibleSeries: Series[];
};

const getSeriesFx = createEffect<void, Series[]>();
const incrementSeriesPageFx = createEvent();
const resetSeriesPageFx = createEvent();
const onSearchSeriesFx = createEvent<string>();

const $series = createStore<SeriesState>({
  seriesList: [],
  page: 1,
  perPage: 50,
  visibleSeries: []
});

$series.on(incrementSeriesPageFx, state => ({
  ...state,
  page:
    state.visibleSeries.length === state.seriesList.length
      ? state.page
      : state.page + 1,
  visibleSeries:
    state.visibleSeries.length === state.seriesList.length
      ? state.visibleSeries
      : state.seriesList.slice(0, (state.page + 1) * state.perPage)
}));

$series.on(resetSeriesPageFx, state => ({
  ...state,
  page: 1,
  visibleSeries: state.seriesList.slice(0, state.perPage)
}));

$series.on(onSearchSeriesFx, (state, value) => {
  if (value) {
    return {
      ...state,
      page: 1,
      visibleSeries: state.seriesList.filter(el => el.label.startsWith(value))
    };
  }
});

getSeriesFx.use(async () => {
  const series = await axios.get<PaginatedResponse<SeriesModel>>(
    `${backendUrl}/series`
  );

  return series.data.data.map(el => ({ label: el.name, value: el.id }));
});

$series.on(getSeriesFx.doneData, (state, seriesList) => ({
  seriesList,
  page: state.page,
  perPage: state.perPage,
  visibleSeries: seriesList.slice(0, state.perPage)
}));

export {
  $series,
  getSeriesFx,
  incrementSeriesPageFx,
  resetSeriesPageFx,
  onSearchSeriesFx
};
