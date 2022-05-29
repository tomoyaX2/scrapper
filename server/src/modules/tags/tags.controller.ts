import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedTagsDto, TagsDto } from './tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedTagsDto> {
    return this.tagsService.getTags({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  saveTag(@Body() tag: TagsDto) {
    return this.tagsService.saveTag(tag);
  }
}
