import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryDto } from './gallery.dto';
import { Gallery } from './gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  getGallery(): Promise<Gallery[]> {
    return this.galleryRepository.find();
  }

  async createGallery(gallery: GalleryDto): Promise<void> {
    const result = await this.galleryRepository.save(gallery);
    console.log(result);
    return;
  }
}
