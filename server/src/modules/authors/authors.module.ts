import { Module } from '@nestjs/common';
import { AuthorController } from './authors.controller';
import { AuthorService } from './authors.service';

@Module({
  imports: [],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorsModule {}
