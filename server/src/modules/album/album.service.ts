import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  init(): string {
    return 'Album';
  }
}
