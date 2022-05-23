import { Album } from '../album/album.entity';

export interface TypeDto {
  name: string;
  albums?: Album[];
}
