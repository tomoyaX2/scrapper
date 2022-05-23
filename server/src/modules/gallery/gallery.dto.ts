import { Album } from '../album/album.entity';

export interface GalleryDto {
  name: string;
  albums: Album[];
}
