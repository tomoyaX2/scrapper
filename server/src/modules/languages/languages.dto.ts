import { Album } from '../album/album.entity';

export interface LanguageDto {
  name: string;
  albums?: Album[];
}
