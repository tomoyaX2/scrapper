import { Controller, Get, Post } from '@nestjs/common';
import { TypeDto } from './type.dto';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes(): Promise<Type[]> {
    return this.typeService.getTypes();
  }

  @Post()
  createType(type: TypeDto): Promise<Type> {
    return this.typeService.createType(type);
  }
}
