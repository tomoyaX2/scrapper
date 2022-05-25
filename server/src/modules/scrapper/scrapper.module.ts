import { Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { LogModule } from '../log/log.module';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';

@Module({
  imports: [AlbumModule, LogModule],
  controllers: [ScrapperController],
  providers: [ScrapperService],
  exports: [ScrapperService],
})
export class ScrapperModule {}
