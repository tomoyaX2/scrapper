import { Controller, Get, Post, Query } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { Author } from './authors.entity';
import { AuthorDto } from './authors.dto';
import { PaginatedResponse } from 'src/shared/types';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): PaginatedResponse<Author> {
    return this.authorService.getAuthors({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createAuthors(author: AuthorDto): Promise<Author> {
    return this.authorService.createAuthor(author);
  }
}
