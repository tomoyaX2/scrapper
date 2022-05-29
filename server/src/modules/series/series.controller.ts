import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedSeriesDto, SeriesDto } from './series.dto';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  getSeries(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedSeriesDto> {
    return this.seriesService.getSeries({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createSeries(@Body() series: SeriesDto): Promise<SeriesDto> {
    try {
      return this.seriesService.createSeries(series);
    } catch (e) {}
  }
}
