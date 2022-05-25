import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { TypeDto } from './type.dto';
import { Type } from './type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
    private logService: LogService,
  ) {}

  getTypes(): Promise<Type[]> {
    return this.typesRepository.find({
      relations: [
        'albums',
        'albums.images',
        'albums.authors',
        'albums.type',
        'albums.series',
        'albums.language',
        'albums.group',
      ],
    });
  }

  async createType(type: TypeDto): Promise<Type> {
    try {
      return await this.typesRepository.save(type);
    } catch (e) {}
  }

  async assignType(name: string) {
    try {
      const series = await this.typesRepository.findOne({ name });
      if (series?.name) {
        return series;
      }
      return await this.typesRepository.save({ name });
    } catch (e) {}
  }

  async assignAlbumToType(album: Album): Promise<void> {
    try {
      await this.typesRepository.save({
        ...album.type,
        albums: [...(album.type?.albums || []), album],
      });
    } catch (e) {
      this.logService.saveLog(`${e}, 'assign album to tag error', ${album}`);
    }
  }
}
