import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { SeriesDto } from './series.dto';
import { Series } from './series.entity';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  getSeries(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: string,
  ): PaginatedResponse<Series> {
    return this.seriesService.getSeries({ page, perPage, name });
  }

  @Post()
  createSeries(series: SeriesDto): Promise<Series> {
    try {
      return this.seriesService.createSeries(series);
    } catch (e) {}
  }
}
