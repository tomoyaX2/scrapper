import { Controller, Get } from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Promise<Album[]> {
    return this.albumService.getAlbums();
  }
}
