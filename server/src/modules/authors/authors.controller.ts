import { Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { Author } from './authors.entity';
import { AuthorDto } from './authors.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(): Promise<Author[]> {
    return this.authorService.getAuthors();
  }

  @Post()
  createAuthors(author: AuthorDto): Promise<Author> {
    return this.authorService.createAuthor(author);
  }
}
