import { Controller, Get, Post } from '@nestjs/common';
import { SeriesDto } from './series.dto';
import { Series } from './series.entity';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  getSeries(): Promise<Series[]> {
    return this.seriesService.getSeries();
  }

  @Post()
  createSeries(series: SeriesDto): Promise<void> {
    return this.seriesService.createSeries(series);
  }
}
