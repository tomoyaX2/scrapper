import {
  Controller,
  StreamableFile,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiQuery({
    name: 'albumId',
    type: String,
    required: true,
  })
  @Post()
  async requestAlbumToDownload(
    @Response({ passthrough: true }) res,
    @Body()
    album: {
      images: { url: string }[];
      id: string;
      path: string;
    },
  ): Promise<StreamableFile> {
    const { file, name } = await this.fileService.requestAlbumToDownload(album);
    res.set({
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    return new StreamableFile(file);
  }
}
