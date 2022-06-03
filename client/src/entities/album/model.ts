import axios from 'axios';
import { createEffect, createStore } from 'effector';

type Album = {
  title: string;
  id: string;
  type: string;
  language: string;
  images: {
    id: string;
    url: string;
  }[];
  // preview: string[] will be done later
};

const $albums = createStore<{ data: Album[] }>({ data: [] });

const fetchAlbumsFx = createEffect<void, { data: Album[] }>(async () => {
  const res = await axios.get<{ data: Album[] }>(
    `http://localhost:8000/albums`
  );

  return res.data;
});

$albums.on(fetchAlbumsFx.doneData, (_, albums) => {
  console.log('test', albums);

  return albums;
});

export { fetchAlbumsFx, $albums };
export type { Album };
