import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedTypeDto, TypeDto } from './type.dto';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedTypeDto> {
    return this.typeService.getTypes({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createType(type: TypeDto): Promise<TypeDto> {
    return this.typeService.createType(type);
  }
}
