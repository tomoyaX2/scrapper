import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { LogModule } from '../log/log.module';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';

@Module({
  imports: [LogModule, FileModule],
  controllers: [ScrapperController],
  providers: [ScrapperService],
  exports: [ScrapperService],
})
export class ScrapperModule {}
