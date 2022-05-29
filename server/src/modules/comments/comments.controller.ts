import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthorService } from './comments.service';
import { AuthorDto, PaginatedAuthorDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedAuthorDto> {
    return this.authorService.getAuthors({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createComment(@Body() author: AuthorDto): Promise<AuthorDto> {
    return this.authorService.createAuthor(author);
  }
}
