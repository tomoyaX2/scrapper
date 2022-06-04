import axios from 'axios';
import { createEffect, createStore } from 'effector';

type Album = {
  name: string;
  id: string;
  series: { name: string; id: string }[];
  type: { name: string; id: string };
  language: { name: string; id: string };
  tags: { name: string; id: string }[];
  authors: { name: string; id: string }[];
  group: { name: string; id: string };
  images: {
    id: string;
    name: string;
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

const $albumPage = createStore<Album | null>(null);

const fetchAlbumsFx = createEffect<void, AlbumResponse>();

const downloadAlbumFx = createEffect<Album, void>();

const changePageOptionsFx = createEffect<
  { page: number; perPage: number },
  AlbumResponse & { page: number; perPage: number }
>();

const fetchAlbumFx = createEffect<string, Album>();

$albumsState.on(fetchAlbumsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  data: albums.data,
  total: parseInt(albums.total)
}));

$albumsState.on(changePageOptionsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  page: albums.page,
  perPage: albums.perPage,
  data: albums.data,
  total: parseInt(albums.total)
}));

$albumPage.on(fetchAlbumFx.doneData, (_, album) => album);

changePageOptionsFx.use(async ({ page, perPage }) => {
  const res = await axios.get<AlbumResponse>(
    `http://localhost:8000/albums?page=${page}&perPage=${perPage}`
  );

  return { data: res.data.data, total: res.data.total, page, perPage };
});

downloadAlbumFx.use(async album => {
  const response = await axios.get<AlbumResponse>(
    `http://localhost:8080/file?albumId=${album.id}`,
    { responseType: 'arraybuffer' }
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${album.name}.zip`); //or any other extension
  document.body.appendChild(link);
  link.click();
});

fetchAlbumsFx.use(async () => {
  const res = await axios.get<AlbumResponse>(
    `http://localhost:8000/albums?page=1&perPage=20`
  );

  return { data: res.data.data, total: res.data.total };
});

fetchAlbumFx.use(async (albumId: string) => {
  const res = await axios.get<Album>(`http://localhost:8000/albums/${albumId}`);

  return res.data;
});

export {
  fetchAlbumsFx,
  $albumsState,
  changePageOptionsFx,
  $albumPage,
  fetchAlbumFx,
  downloadAlbumFx
};
export type { Album, AlbumResponse };
