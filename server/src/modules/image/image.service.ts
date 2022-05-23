import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  getImages(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  async createImage(image: ImageDto): Promise<void> {
    const result = await this.imagesRepository.save(image);
    console.log(result, 'image');
    return;
  }
}
