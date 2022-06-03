import axios from 'axios';
import { createEffect, createStore } from 'effector';

type Album = {
  name: string;
  id: string;
  type: { name: string };
  language: { name: string };
  images: {
    id: string;
    url: string;
  }[];
  // preview: string[] will be done later
};

type AlbumResponse = { data: Album[]; total: string };

const $albumsState = createStore<{
  data: Album[];
  page: number;
  perPage: number;
  total: number;
}>({
  data: [],
  page: 1,
  perPage: 20,
  total: 0
});

const fetchAlbumsFx = createEffect<void, AlbumResponse>(async () => {
  const res = await axios.get<AlbumResponse>(
    `http://localhost:8000/albums?page=1&perPage=20`
  );

  return { data: res.data.data, total: res.data.total };
});

const changePageOptionsFx = createEffect<
  { page: number; perPage: number },
  AlbumResponse & { page: number; perPage: number }
>(async ({ page, perPage }) => {
  const res = await axios.get<AlbumResponse>(
    `http://localhost:8000/albums?page=${page}&perPage=${perPage}`
  );

  return { data: res.data.data, total: res.data.total, page, perPage };
});

$albumsState.on(fetchAlbumsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  data: albums.data,
  total: parseInt(albums.total)
}));

$albumsState.on(changePageOptionsFx.doneData, (albumsState, albums) => {
  console.log(albumsState, albums, '1111');

  return {
    ...albumsState,
    page: albums.page,
    perPage: albums.perPage,
    data: albums.data,
    total: parseInt(albums.total)
  };
});

export { fetchAlbumsFx, $albumsState, changePageOptionsFx };
export type { Album };
