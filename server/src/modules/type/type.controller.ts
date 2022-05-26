import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { TypeDto } from './type.dto';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: string,
  ): PaginatedResponse<Type> {
    return this.typeService.getTypes({ page, perPage, name });
  }

  @Post()
  createType(type: TypeDto): Promise<Type> {
    return this.typeService.createType(type);
  }
}
