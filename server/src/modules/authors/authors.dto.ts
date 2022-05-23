import { AlbumDto } from '../album/album.dto';

export interface AuthorDto {
  name: string;
  albums?: AlbumDto[];
}
