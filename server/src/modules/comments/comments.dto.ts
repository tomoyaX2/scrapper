import { AlbumDto } from '../album/album.dto';
import { UserDto } from '../users/users.dto';

export class PaginatedCommentDto {
  data: CommentDto[];
  total: number;
  currentPage: number;
}

export class CommentDto {
  id: string;
  title: string;
  text: string;
  author: UserDto;
  album: AlbumDto;
}
