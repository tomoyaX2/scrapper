import { Album } from '../album/album.entity';

export interface GroupDto {
  name: string;
  albums?: Album[];
}
