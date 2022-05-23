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

  async createAuthors(author: AuthorDto): Promise<void> {
    const result = await this.authorRepository.save(author);
    console.log(result);
    return;
  }
}
