import { Album } from '../album/album.entity';

export interface ImageDto {
  name?: string;
  url?: string;
  album?: Album;
}
