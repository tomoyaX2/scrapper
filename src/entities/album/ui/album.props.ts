import type { Album } from '../model';

type AlbumProps = {
  album: Album;
  page?: number;
  perPage?: number;
};

export type { AlbumProps };
