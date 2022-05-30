import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import axios from 'axios';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { LogService } from '../log/log.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private logService: LogService) {}

  async requestAlbumToDownload(album: {
    images: { url: string }[];
    id: string;
    path: string;
  }): Promise<{ file: fs.ReadStream; name: string }> {
    const tempAlbumPath = `public/temp/${album.id}`;
    const zipPath = tempAlbumPath + `/${album.id}.zip`;
    let imageIndex = 0;
    if (!fs.existsSync('public/temp')) {
      fs.mkdirSync('public/temp');
    }
    if (!fs.existsSync(tempAlbumPath)) {
      fs.mkdirSync(tempAlbumPath);
    }
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');

    output.on('end', function () {
      this.logService.saveLog('Data has been drained for ' + album.path);
    });

    archive.pipe(output);

    for (const image of album.images) {
      const fileName = `/${100000 + imageIndex}.png`;
      //   const filePath = tempAlbumImagesPath + fileName;
      const webpBuffer = await sharp(image.url).toBuffer();
      //   await sharp(webpBuffer).toFile(filePath, (err) => {
      //     if (err) {
      //       this.logService.saveLog(`${JSON.stringify(err)}`);
      //     }
      //   });
      archive.append(webpBuffer, { name: fileName });
      imageIndex++;
    }
    archive.finalize();
    const file = await fs.createReadStream(zipPath);
    return { file, name: `${album.id}.zip` };
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
    albumPath: string,
    currentCount: number,
    total: number,
  ) {
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images');
    }
    if (!fs.existsSync(albumPath)) {
      fs.mkdirSync(albumPath);
    }
    const imageId = uuidv4();

    try {
      const response = await axios.get<string>(imageUrl, {
        responseType: 'arraybuffer',
        headers: {
          referer,
        },
      });
      const PNGBase64 = Buffer.from(response.data, 'binary').toString('base64');
      const path = `${albumPath}/${imageId}.webp`;
      const returnPath = `${process.env.SERVER_URL}/${path}`;
      await fs.writeFile(path, PNGBase64, 'base64', (err) => {
        if (err) throw err;
        this.logService.saveLog(
          `File ${currentCount}/${total}. Original URL: ${originalUrl}, current URL: ${returnPath}`,
        );
      });
      return returnPath;
    } catch (e) {
      this.logService.saveLog(
        `ERROR HAPPENED, ${imageUrl}, ${referer}`,
        'warn',
      );
    }
  }
}
