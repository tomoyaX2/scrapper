import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDto } from './group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  getGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async createGroups(group: GroupDto): Promise<void> {
    await this.groupRepository.save(group);
    return;
  }
}
