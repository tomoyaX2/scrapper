import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GroupDto, PaginatedGroupDto } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getGroups(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedGroupDto> {
    return this.groupService.getGroups({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createGroup(@Body() group: GroupDto): Promise<GroupDto> {
    return this.groupService.createGroup(group);
  }
}
