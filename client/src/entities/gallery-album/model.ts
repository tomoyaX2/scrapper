import axios from 'axios';
import { createEffect, createStore } from 'effector';

type AlbumType = {
  title: string;
  id: string;
  type: string;
  language: string;
  images: string;
  // preview: string[] will be done later
};

const fetchAlbumsFx = createEffect(async () => {
  const res = await axios.get<AlbumType[]>(`http://localhost:8000/albums`);

  return res.data;
});

const $albums = createStore<AlbumType[]>([]).on(
  fetchAlbumsFx.doneData,
  (albums, album) => [...albums, album]
);
export { fetchAlbumsFx, $albums };
export type { AlbumType };
