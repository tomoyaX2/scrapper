import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  init(): string {
    return 'GalleryService';
  }
}
