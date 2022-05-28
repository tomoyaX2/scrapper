import { Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { LogService } from '../log/log.service';

@Injectable()
export class FileService {
  constructor(
    private albumService: AlbumService,
    private logService: LogService,
  ) {}

  async requestAlbumToDownload(
    albumId: string,
  ): Promise<{ file: fs.ReadStream; name: string }> {
    const neededAlbum = await this.albumService.getAlbumById(albumId);
    const tempAlbumPath = `public/temp/${neededAlbum.id}`;
    const zipPath = tempAlbumPath + `/${neededAlbum.id}.zip`;
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
      this.logService.saveLog('Data has been drained for ' + neededAlbum.path);
    });

    archive.pipe(output);

    for (const image of neededAlbum.images) {
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
    return { file, name: `${neededAlbum.id}.zip` };
  }
}
