import { Album } from '../albums/types';

export type Gallery = {
  id: string;
  name: string;
  maxAmount: number;
  albums: Album[];
};

export type GalleryState = {
  favourites: Gallery;
  recentlyViewed: Gallery;
  isLoading: boolean;
};
