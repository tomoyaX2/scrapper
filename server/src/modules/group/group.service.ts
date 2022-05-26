import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumRelations } from 'src/shared/constants';
import { DefaultPaginationQuery, PaginatedResponse } from 'src/shared/types';
import { Like, Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { GroupDto } from './group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private logService: LogService,
  ) {}

  async getGroups({
    page,
    perPage,
    name,
  }: DefaultPaginationQuery): PaginatedResponse<Group> {
    const [data, total] = await this.groupRepository.findAndCount({
      where: name ? { name: Like('%' + name + '%') } : {},
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async createGroup(group: GroupDto): Promise<Group> {
    try {
      return await this.groupRepository.save(group);
    } catch (e) {}
  }

  async assignGroup(name: string): Promise<Group> {
    try {
      const group = await this.groupRepository.findOne({ name });
      if (group?.name) {
        return group;
      }
      return await this.groupRepository.save({ name });
    } catch (e) {}
  }

  async assignAlbumToGroup(album: Album): Promise<void> {
    try {
      await this.groupRepository.save({
        ...album.group,
        albums: [...(album.group?.albums || []), album],
      });
    } catch (e) {
      this.logService.saveLog(
        `${e}, 'assign album to group error', ${JSON.stringify(album)}`,
        'warn',
      );
    }
  }
}
