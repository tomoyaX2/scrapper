import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  init(): string {
    return 'Tags';
  }
}
