import { Album } from '../albums/types';

export type Gallery = {
  id: string;
  name: string;
  albums: Album[];
};

export type GalleryState = {
  favourites: Gallery;
  recentlyViewed: Gallery;
  isLoading: boolean;
};
