import { Album } from 'src/store/albums/types';

type AlbumProps = {
  album: Album;
  page?: number;
  perPage?: number;
  galleryId?: string;
};

export type { AlbumProps };
