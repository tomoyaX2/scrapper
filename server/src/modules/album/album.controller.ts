import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getHello(): string {
    return this.albumService.init();
  }
}
