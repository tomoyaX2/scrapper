import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultPaginationQuery } from 'src/shared/types';
import { Repository } from 'typeorm';
import { LogService } from '../log/log.service';
import { CommentDto, PaginatedCommentDto } from './comments.dto';
import { Comment } from './comments.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<CommentDto>,
    private logService: LogService,
  ) {}

  async getAuthors({
    page,
    perPage,
  }: DefaultPaginationQuery): Promise<PaginatedCommentDto> {
    const [data, total] = await this.commentsRepository.findAndCount({
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }
}
