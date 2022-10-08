import { Album } from 'src/store/albums/types';

type AlbumProps = {
  album: Album;
  page?: number;
  perPage?: number;
};

export type { AlbumProps };
