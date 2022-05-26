import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: string,
  ): PaginatedResponse<Tag> {
    return this.tagsService.getTags({ page, perPage, name });
  }

  @Post()
  saveTag(tag: TagsDto): Promise<Tag> {
    return this.tagsService.saveTag(tag);
  }
}
