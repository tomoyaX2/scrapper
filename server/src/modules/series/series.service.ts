import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumRelations } from 'src/shared/constants';
import { DefaultPaginationQuery, PaginatedResponse } from 'src/shared/types';
import { Like, Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { SeriesDto } from './series.dto';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
    private logService: LogService,
  ) {}

  async getSeries({
    page,
    perPage,
    name,
  }: DefaultPaginationQuery): PaginatedResponse<Series> {
    const [data, total] = await this.seriesRepository.findAndCount({
      where: name ? { name: Like('%' + name + '%') } : {},
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async createSeries(series: SeriesDto): Promise<Series> {
    try {
      return await this.seriesRepository.save(series);
    } catch (e) {}
  }

  async assignSeries(name: string): Promise<Series> {
    try {
      const series = await this.seriesRepository.findOne({ name });
      if (series?.name) {
        return series;
      }
      return await this.seriesRepository.save({ name });
    } catch (e) {}
  }

  async assignAlbumToSeries(album: Album): Promise<Series> {
    try {
      return await this.seriesRepository.save({
        ...album.series,
        albums: [...(album.series?.albums || []), album],
      });
    } catch (e) {
      this.logService.saveLog(
        `${e}, 'assign album to series error', ${JSON.stringify(album)}`,
        'warn',
      );
    }
  }
}
