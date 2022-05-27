import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumRelations } from 'src/shared/constants';
import { PaginatedResponse, DefaultPaginationQuery } from 'src/shared/types';
import { Like, Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { AuthorDto } from './authors.dto';
import { Author } from './authors.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    private logService: LogService,
  ) {}

  async getAuthors({
    page,
    perPage,
    name,
  }: DefaultPaginationQuery): PaginatedResponse<Author> {
    const [data, total] = await this.authorRepository.findAndCount({
      where: name ? { name: Like('%' + name + '%') } : {},
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async createAuthor(author: AuthorDto): Promise<Author> {
    try {
      return await this.authorRepository.save(author);
    } catch (e) {}
  }

  async assignAuthor(name: string): Promise<Author> {
    try {
      const author = await this.authorRepository.findOne({ name });
      if (author?.name) {
        return author;
      }
      return await this.authorRepository.save({ name });
    } catch (e) {}
  }

  async assignAuthorToAlbum(authors: string[]): Promise<Author[]> {
    const albumAuthors: Author[] = [];
    for (const author of authors) {
      const albumAuthor = await this.assignAuthor(author);
      albumAuthors.push(albumAuthor);
    }
    return albumAuthors;
  }

  async assignAlbumToAuthor(album: Album): Promise<void> {
    for (const albumAuthor of album.authors) {
      try {
        const targetAuthor = await this.authorRepository.findOne({
          id: albumAuthor.id,
        });
        await this.authorRepository.save({
          ...targetAuthor,
          albums: [...(targetAuthor?.albums || []), album],
        });
      } catch (e) {
        this.logService.saveLog(
          `${e}, 'assign album to author error', ${album}`,
          'warn',
        );
      }
    }
  }
}
