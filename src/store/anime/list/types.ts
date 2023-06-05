export type Image = {
  id: string;
  name: string;
  url: string;
};

export type Search = {
  page: number;
  perPage: number;
};

export type AnimeState = {
  data: Anime[];
  total: number;
  isLoading: boolean;
  search: Search;
};

export type Anime = {
  title: string;
  id: string;
  type?: { name: string; id: string };
  language?: { name: string; id: string };
  tags?: { name: string; id: string }[];
  authors?: { name: string; id: string }[];
  coverImageUrl?: string;
  path: string;
  views?: number;
  rate?: number;
  // preview: string[] will be done later
};

export type AlbumResponse = { data: Anime[]; total: string };
