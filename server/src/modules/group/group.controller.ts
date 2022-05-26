import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getGroups(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): PaginatedResponse<Group> {
    return this.groupService.getGroups({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createGroup(group): Promise<Group> {
    return this.groupService.createGroup(group);
  }
}
