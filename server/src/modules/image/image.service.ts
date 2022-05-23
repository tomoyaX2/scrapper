import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  getImages(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  async saveImage(image: ImageDto): Promise<Image> {
    return await this.imagesRepository.save(image);
  }

  async writeImage(
    {
      imageUrl,
      referer,
    }: {
      imageUrl: string;
      referer: string;
    },
    imageId: string,
    albumPath: string,
  ) {
    console.log(imageUrl, 'imageUrl');
    const response = await axios.get<string>(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        referer,
      },
    });
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }
    if (!fs.existsSync(albumPath)) {
      fs.mkdirSync(albumPath);
    }

    const PNGBase64 = Buffer.from(response.data, 'binary').toString('base64');
    const path = `${albumPath}/${imageId}.webp`;
    fs.writeFile(path, PNGBase64, 'base64', function (err) {
      if (err) throw err;
      console.log('File saved.');
    });
    return path;
  }
}
