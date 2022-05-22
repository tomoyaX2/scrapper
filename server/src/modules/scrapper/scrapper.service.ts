import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapperService {
  init(): string {
    return 'Init';
  }
}
