import { Album } from '../albums/types';

export type Gallery = {
  id: string;
  name: string;
  albums: Album[];
};

export type GalleryState = {
  galleryList: Gallery[];
  isLoading: boolean;
};
