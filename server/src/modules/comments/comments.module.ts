import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/log.module';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.entity';
import { AuthorService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), LogModule],
  controllers: [CommentsController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorsModule {}
