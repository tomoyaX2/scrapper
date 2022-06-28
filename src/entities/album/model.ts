/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';
import { backendUrl } from '@shared/api';

type Image = {
  id: string;
  name: string;
  url: string;
};

type Search = {
  tags?: string[];
  types?: string[];
  languages?: string[];
  series?: string[];
  authors?: string[];
  groups?: string[];
  title?: string;
  page: number;
  perPage: number;
};

type Album = {
  title: string;
  id: string;
  series: { name: string; id: string }[];
  type: { name: string; id: string };
  language: { name: string; id: string };
  tags: { name: string; id: string }[];
  authors: { name: string; id: string }[];
  group: { name: string; id: string };
  preview?: string;
  totalImages?: number;
  images: Image[];
  path: string;
  downloadPath: string;
  views?: number;
  // preview: string[] will be done later
};

type AlbumResponse = { data: Album[]; total: string };

type ReaderPageOption = { label: number; value: number };
type ReaderPage = {
  currentPage: number;
  images: Image[];
  pagesList: ReaderPageOption[];
};

const $albumsState = createStore<{
  data: Album[];
  total: number;
  isLoading: boolean;
}>({
  data: [],
  total: 0,
  isLoading: false
});

const $search = createStore<Search>({ page: 1, perPage: 20 });

const $albumPage = createStore<Album | null>(null);

const $readerPage = createStore<ReaderPage>({
  currentPage: 1,
  images: [],
  pagesList: []
});

const downloadAlbumFx = createEffect<Album, void>();

const searchAlbumsFx = createEffect<
  Record<string, string[] | string | number | boolean>,
  AlbumResponse
>();

const fetchAlbumFx = createEffect<string, Album>();

const changeReaderPageFx = createEvent<number>();
const changeSearchStateFx = createEvent<Search>();
const resetAlbumStateFx = createEvent();

$readerPage.on(fetchAlbumFx.doneData, (_, album) => ({
  images: album.images,
  currentPage: 1,
  pagesList: Array.from(Array(album.images.length).keys()).map(key => ({
    label: key + 1,
    value: key + 1
  }))
}));

$albumPage.on(resetAlbumStateFx, () => null);

$readerPage.on(changeReaderPageFx, (readerState, readerPage) => ({
  ...readerState,
  currentPage: readerPage
}));

$search.on(changeSearchStateFx, (_, search) => {
  const initialSearch: Search = { page: 1, perPage: 20 };
  const searchKeys = Object.keys(search) as unknown as (keyof Search)[];

  for (const searchKey of searchKeys) {
    if (search[searchKey]) {
      //@ts-expect-error
      initialSearch[searchKey] = search[searchKey];
    }
  }

  return initialSearch;
});

$albumsState.on(searchAlbumsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  data: albums.data,
  total: parseInt(albums.total),
  isLoading: false
}));

$albumsState.on(searchAlbumsFx.pending, albumsState => ({
  ...albumsState,
  isLoading: true
}));

$albumPage.on(fetchAlbumFx.doneData, (_, album) => album);

downloadAlbumFx.use(async album => {
  const link = document.createElement('a');
  link.href = album.downloadPath;
  link.setAttribute('download', `${album.title}.zip`); //or any other extension
  document.body.appendChild(link);
  link.click();
});

searchAlbumsFx.use(async body => {
  const response = await axios.post<AlbumResponse>(
    `${backendUrl}/albums/search`,
    body
  );

  return response.data;
});

fetchAlbumFx.use(async (albumId: string) => {
  const res = await axios.get<Album>(`${backendUrl}/albums/${albumId}`);

  return res.data;
});

export {
  $albumsState,
  $albumPage,
  fetchAlbumFx,
  downloadAlbumFx,
  $readerPage,
  changeReaderPageFx,
  searchAlbumsFx,
  changeSearchStateFx,
  $search,
  resetAlbumStateFx
};
export type { Album, AlbumResponse, Search };
