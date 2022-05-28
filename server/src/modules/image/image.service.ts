import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';
import axios from 'axios';
import * as fs from 'fs';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { DefaultPaginationQuery, PaginatedResponse } from 'src/shared/types';
import { albumRelations } from 'src/shared/constants';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private logService: LogService,
  ) {}

  async getImages({
    page,
    perPage,
  }: DefaultPaginationQuery): PaginatedResponse<Image> {
    const [data, total] = await this.imagesRepository.findAndCount({
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async saveImage(image: ImageDto): Promise<Image> {
    return await this.imagesRepository.save(image);
  }

  async writeImage(
    {
      imageUrl,
      referer,
      originalUrl,
    }: {
      imageUrl: string;
      referer: string;
      originalUrl: string;
    },
    imageId: string,
    albumPath: string,
    currentCount: string,
  ) {
    try {
      const response = await axios.get<string>(imageUrl, {
        responseType: 'arraybuffer',
        headers: {
          referer,
        },
      });
      const PNGBase64 = Buffer.from(response.data, 'binary').toString('base64');
      const path = `${albumPath}/${imageId}.webp`;
      await fs.writeFile(path, PNGBase64, 'base64', (err) => {
        if (err) throw err;
        this.logService.saveLog(
          `File ${currentCount}. Original URL: ${originalUrl}, current URL: http://localhost:3000/${path}`,
        );
      });
      return path;
    } catch (e) {
      this.logService.saveLog(
        `ERROR HAPPENED, ${imageUrl}, ${referer}`,
        'warn',
      );
    }
  }

  async assignImageToAlbum(
    images: { imageUrl: string; referer: string; originalUrl: string }[],
    albumPath: string,
  ) {
    let index = 0;
    const albumImages: Image[] = [];
    for (const image of images) {
      index++;
      const adImage = await this.saveImage({});
      const imagePath = await this.writeImage(
        image,
        adImage.id,
        albumPath,
        `${index}/${images.length}`,
      );
      if (imagePath) {
        const albumImage = await this.saveImage({
          ...adImage,
          url: imagePath,
          name: adImage.id,
        });
        albumImages.push(albumImage);
      }
    }
    return albumImages;
  }

  async assignAlbumToImage(album: Album): Promise<void> {
    for (const albumImage of album.images) {
      try {
        await this.imagesRepository.save({ ...albumImage, album });
      } catch (e) {
        this.logService.saveLog(
          `${e}, 'assign album to image error', ${JSON.stringify(album)}`,
          'warn',
        );
      }
    }
  }
}
