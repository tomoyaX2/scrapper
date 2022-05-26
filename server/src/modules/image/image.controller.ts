import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getImages(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): PaginatedResponse<Image> {
    return this.imageService.getImages({ page, perPage });
  }

  @Post()
  saveImage(image: ImageDto): Promise<Image> {
    return this.imageService.saveImage(image);
  }
}
