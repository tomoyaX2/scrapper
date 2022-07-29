export type Series = {
  value: string;
  label: string;
};

export type SeriesModel = {
  id: string;
  name: string;
};

export type SeriesState = {
  seriesList: Series[];
  page: number;
  perPage: number;
  visibleSeries: Series[];
};
