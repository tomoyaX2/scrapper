import axios from 'axios';
import { createEffect, createStore } from 'effector';
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
};

const getSeriesFx = createEffect<void, Series[]>();

const $series = createStore<SeriesState>({
  seriesList: []
});

getSeriesFx.use(async () => {
  const series = await axios.get<PaginatedResponse<SeriesModel>>(
    'http://localhost:8000/series'
  );

  return series.data.data.map(el => ({ label: el.name, value: el.id }));
});

$series.on(getSeriesFx.doneData, (_, seriesList) => ({
  seriesList
}));

export { $series, getSeriesFx };
