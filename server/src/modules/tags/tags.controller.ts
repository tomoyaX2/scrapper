import { Controller, Get, Post } from '@nestjs/common';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }

  @Post()
  createTag(tag: TagsDto): Promise<void> {
    return this.tagsService.createTag(tag);
  }
}
