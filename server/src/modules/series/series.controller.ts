import { Controller, Get } from '@nestjs/common';
import { Series } from './series.entity';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  getSeries(): Promise<Series[]> {
    return this.seriesService.getSeries();
  }
}
