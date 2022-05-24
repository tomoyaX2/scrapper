import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { AuthorDto } from './authors.dto';
import { Author } from './authors.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  getAuthors(): Promise<Author[]> {
    return this.authorRepository.find({
      relations: [
        'albums',
        'albums.images',
        'albums.authors',
        'albums.type',
        'albums.series',
        'albums.language',
        'albums.group',
      ],
    });
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
        await this.authorRepository.save({
          ...albumAuthor,
          albums: [...(albumAuthor?.albums || []), album],
        });
      } catch (e) {
        console.log(e, 'assign album to author error', album);
      }
    }
  }
}
