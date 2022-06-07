import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';

type Image = {
  id: string;
  name: string;
  url: string;
};
type Album = {
  name: string;
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

const $readerPage = createStore<ReaderPage>({
  currentPage: 1,
  images: [],
  pagesList: []
});

const fetchAlbumsFx = createEffect<void, AlbumResponse>();

const downloadAlbumFx = createEffect<Album, void>();

const searchAlbumsFx = createEffect<
  Record<string, string[] | string | number>,
  AlbumResponse & { page: number; perPage: number }
>();

const changePageOptionsFx = createEffect<
  { page: number; perPage: number },
  AlbumResponse & { page: number; perPage: number }
>();

const fetchAlbumFx = createEffect<string, Album>();

const changeReaderPageFx = createEvent<number>();

$albumsState.on(fetchAlbumsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  data: albums.data,
  total: parseInt(albums.total)
}));

$readerPage.on(fetchAlbumFx.doneData, (_, album) => ({
  images: album.images,
  currentPage: 1,
  pagesList: Array.from(Array(album.images.length).keys()).map(key => ({
    label: key + 1,
    value: key + 1
  }))
}));

$readerPage.on(changeReaderPageFx, (readerState, readerPage) => ({
  ...readerState,
  currentPage: readerPage
}));

$albumsState.on(changePageOptionsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  page: albums.page,
  perPage: albums.perPage,
  data: albums.data,
  total: parseInt(albums.total)
}));

$albumsState.on(searchAlbumsFx.doneData, (albumsState, albums) => ({
  ...albumsState,
  page: albums.page,
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

searchAlbumsFx.use(async body => {
  const response = await axios.post<AlbumResponse>(
    `http://localhost:8000/albums/search`,
    body
  );
  console.log(response, 'response');

  return response.data;
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
  downloadAlbumFx,
  $readerPage,
  changeReaderPageFx,
  searchAlbumsFx
};
export type { Album, AlbumResponse };
