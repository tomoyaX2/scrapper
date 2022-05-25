import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private logService: LogService,
  ) {}

  getTags(): Promise<Tag[]> {
    return this.tagsRepository.find({
      relations: [
        'albums',
        'albums.images',
        'albums.authors',
        'albums.type',
        'albums.series',
        'albums.language',
        'albums.group',
      ],
    });
  }

  async saveTag(tag: TagsDto): Promise<Tag> {
    try {
      return await this.tagsRepository.save(tag);
    } catch (e) {}
  }

  async assignTag(name: string): Promise<Tag> {
    try {
      const tag = await this.tagsRepository.findOne({ name });
      if (tag?.name) {
        return tag;
      }
      return await this.tagsRepository.save({ name });
    } catch (e) {}
  }
  async generateAlbumTags(tags: string[]): Promise<Tag[]> {
    const albumTags = new Map<string, Tag>();

    for (const tag of tags) {
      const albumTag = await this.assignTag(tag);
      if (albumTag) {
        albumTags.set(albumTag.id, albumTag);
      }
    }
    const result = Array.from(albumTags).map((el) => el[1]);
    return result;
  }

  async assignAlbumToTag(album: Album): Promise<void> {
    for (const albumTag of album.tags) {
      try {
        await this.tagsRepository.save({
          ...albumTag,
          albums: [...(albumTag?.albums || []), album],
        });
      } catch (e) {
        this.logService.saveLog(
          `${e}, 'assign album to tag error', ${JSON.stringify(album)}`,
          'warn',
        );
      }
    }
  }
}
