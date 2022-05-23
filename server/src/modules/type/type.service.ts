import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeDto } from './type.dto';
import { Type } from './type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
  ) {}

  getTypes(): Promise<Type[]> {
    return this.typesRepository.find();
  }

  async createType(type: TypeDto): Promise<Type> {
    try {
      return await this.typesRepository.save(type);
    } catch (e) {}
  }
}
