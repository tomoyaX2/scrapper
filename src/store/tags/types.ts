export type Tag = {
  value: string;
  label: string;
};
export type TagModel = {
  id: string;
  name: string;
};
export type TagsState = {
  tagsList: Tag[];
  page: number;
  perPage: number;
  visibleTags: Tag[];
};
