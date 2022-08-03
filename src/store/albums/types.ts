export type Image = {
  id: string;
  name: string;
  url: string;
};

export type Search = {
  tags?: string[];
  types?: string[];
  languages?: string[];
  series?: string[];
  authors?: string[];
  groups?: string[];
  title?: string;
  page: number;
  perPage: number;
  sortBy?: 'rate' | 'views' | 'totalImages';
  shouldResetPage: boolean;
};

export type AlbumsState = {
  data: Album[];
  total: number;
  isLoading: boolean;
  search: Search;
};

export type Album = {
  title: string;
  id: string;
  series?: { name: string; id: string }[];
  type?: { name: string; id: string };
  language?: { name: string; id: string };
  tags?: { name: string; id: string }[];
  authors?: { name: string; id: string }[];
  group?: { name: string; id: string };
  preview?: string;
  previewOrientation?: 'horizontal' | 'vertical';
  totalImages?: number;
  images?: Image[];
  path: string;
  downloadPath?: string;
  views?: number;
  rate?: number;
  // preview: string[] will be done later
};

export type AlbumResponse = { data: Album[]; total: string };
