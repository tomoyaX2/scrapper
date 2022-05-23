import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesDto } from './series.dto';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async getSeries(): Promise<Series[]> {
    const data = await this.seriesRepository.find();
    return data;
  }

  async createSeries(series: SeriesDto): Promise<Series> {
    return await this.seriesRepository.save(series);
  }
}
