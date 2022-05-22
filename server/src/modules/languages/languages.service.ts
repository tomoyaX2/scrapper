import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguagesService {
  init(): string {
    return 'LanguagesService';
  }
}
