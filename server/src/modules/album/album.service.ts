import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { Repository } from 'typeorm';
import { AlbumDto } from './album.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  getAlbums(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async createAlbum(album: AlbumDto): Promise<void> {
    const result = await this.albumRepository.save(album);
    console.log(result);
    return;
  }

  async generateAlbum(album: Record<HitomiFields, any[]>[]) {
    console.log(album, 'album');
  }
}
