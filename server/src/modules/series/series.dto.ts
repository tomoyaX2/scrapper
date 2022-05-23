import { Album } from '../album/album.entity';

export interface SeriesDto {
  name: string;
  albums?: Album[];
}
