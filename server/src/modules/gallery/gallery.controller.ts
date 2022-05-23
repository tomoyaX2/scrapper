import { Controller, Get, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Gallery } from './gallery.entity';
import { GalleryDto } from './gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  getGallery(): Promise<Gallery[]> {
    return this.galleryService.getGallery();
  }

  @Post()
  createGallery(gallery: GalleryDto): Promise<void> {
    return this.galleryService.createGallery(gallery);
  }
}
