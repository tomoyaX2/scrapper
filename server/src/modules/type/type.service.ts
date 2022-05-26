import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumRelations } from 'src/shared/constants';
import { DefaultPaginationQuery, PaginatedResponse } from 'src/shared/types';
import { Like, Repository } from 'typeorm';
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

  async getTypes({
    page,
    perPage,
    name,
  }: DefaultPaginationQuery): PaginatedResponse<Type> {
    const [data, total] = await this.typesRepository.findAndCount({
      where: name ? { name: Like('%' + name + '%') } : {},
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
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
      this.logService.saveLog(
        `${e}, 'assign album to tag error', ${JSON.stringify(album)}`,
        'warn',
      );
    }
  }
}
