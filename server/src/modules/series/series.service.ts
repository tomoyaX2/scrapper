import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  getSeries = async (): Promise<Series[]> => {
    const data = await this.seriesRepository.find();
    return data;
  };
}
