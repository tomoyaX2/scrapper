import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  init(): string {
    return 'GroupService';
  }
}
