import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  getTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async createTag(tag: TagsDto): Promise<Tag> {
    try {
      return await this.tagsRepository.save(tag);
    } catch (e) {}
  }
}
