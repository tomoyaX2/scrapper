export type Tag = {
  value: string;
  label: string;
  albumsCount?: number | undefined;
};
export type TagModel = {
  id: string;
  name: string;
  albumsCount?: number | undefined;
};
export type TagsState = {
  tagsList: Tag[];
  page: number;
  perPage: number;
  visibleTags: Tag[];
};
