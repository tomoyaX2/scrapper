import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from './authors.dto';
import { Author } from './authors.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  getAuthors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async createAuthor(author: AuthorDto): Promise<Author> {
    try {
      return await this.authorRepository.save(author);
    } catch (e) {}
  }
}
