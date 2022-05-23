import { Controller, Get, Post } from '@nestjs/common';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getImages(): Promise<Image[]> {
    return this.imageService.getImages();
  }

  @Post()
  saveImage(image: ImageDto): Promise<Image> {
    return this.imageService.saveImage(image);
  }
}
