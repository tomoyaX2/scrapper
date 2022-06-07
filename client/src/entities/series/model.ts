import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
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
  activeSeries: string[];
  series: Series[];
};

const getSeriesFx = createEffect<void, Series[]>();
const changeActiveSeriesFx = createEvent<string[]>();

const $series = createStore<SeriesState>({
  series: [],
  activeSeries: []
});

getSeriesFx.use(async () => {
  const series = await axios.get<PaginatedResponse<SeriesModel>>(
    'http://localhost:8000/series'
  );

  return series.data.data.map(el => ({ label: el.name, value: el.id }));
});

$series.on(getSeriesFx.doneData, (_, series) => ({
  activeSeries: [],
  series
}));

$series.on(
  changeActiveSeriesFx,
  (state, activeSeries) =>
    state && {
      ...state,
      activeSeries
    }
);

export { $series, getSeriesFx, changeActiveSeriesFx };
