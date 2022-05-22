import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './authors.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getHello(): string {
    return this.authorService.init();
  }
}
