import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  init(): string {
    return 'AuthorService';
  }
}
