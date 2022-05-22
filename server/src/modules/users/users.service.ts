import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  init(): string {
    return 'UsersService';
  }
}
