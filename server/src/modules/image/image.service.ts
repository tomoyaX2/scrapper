import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';
import axios from 'axios';
import * as fs from 'fs';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private logService: LogService,
  ) {}

  getImages(): Promise<Image[]> {
    return this.imagesRepository.find({
      relations: [
        'album',
        'album.images',
        'album.authors',
        'album.type',
        'album.series',
        'album.language',
        'album.group',
      ],
    });
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
        this.logService.saveLog('File saved.' + imageUrl);
      });
      return path;
    } catch (e) {
      this.logService.saveLog(`ERROR HAPPENED, ${imageUrl}, ${referer}`);
    }
  }

  async assignImageToAlbum(
    images: { imageUrl: string; referer: string }[],
    albumPath: string,
  ) {
    let index = 0;
    const albumImages: Image[] = [];
    for (const image of images) {
      index++;
      this.logService.saveLog(`${index}/${images.length} images`);
      const adImage = await this.saveImage({});
      const imagePath = await this.writeImage(image, adImage.id, albumPath);
      if (imagePath) {
        const albumImage = await this.saveImage({
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
          `${e}, 'assign album to image error', ${album}`,
        );
      }
    }
  }
}
