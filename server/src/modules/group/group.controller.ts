import { Controller, Get, Post } from '@nestjs/common';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getGroups(): Promise<Group[]> {
    return this.groupService.getGroups();
  }

  @Post()
  createGroup(group): Promise<Group> {
    return this.groupService.createGroup(group);
  }
}
