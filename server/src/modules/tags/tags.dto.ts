import { Album } from '../album/album.entity';

export interface TagsDto {
  name: string;
  albums?: Album[];
}
