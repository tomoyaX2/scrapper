import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getGroups(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: string,
  ): PaginatedResponse<Group> {
    return this.groupService.getGroups({ page, perPage, name });
  }

  @Post()
  createGroup(group): Promise<Group> {
    return this.groupService.createGroup(group);
  }
}
