import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { getManager, In, Repository } from 'typeorm';
import { AuthorService } from '../authors/authors.service';
import { GroupService } from '../group/group.service';
import { ImageService } from '../image/image.service';
import { LanguagesService } from '../languages/languages.service';
import { SeriesService } from '../series/series.service';
import { TagsService } from '../tags/tags.service';
import { AlbumDto } from './album.dto';
import { Album } from './album.entity';
import * as fs from 'fs';
import { TypeService } from '../type/type.service';
import { LogService } from '../log/log.service';
import {
  PaginatedResponse,
  AlbumPaginationQuery,
  DefaultPaginationQuery,
} from 'src/shared/types';
import { buildAlbumPagination } from './utils';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private authorsService: AuthorService,
    private groupService: GroupService,
    private languageService: LanguagesService,
    private seriesService: SeriesService,
    private tagsService: TagsService,
    private imageService: ImageService,
    private typeService: TypeService,
    private logService: LogService,
  ) {}

  async getAlbums({
    page,
    perPage,
  }: DefaultPaginationQuery): PaginatedResponse<Album> {
    const [data, total] = await this.albumRepository.findAndCount({
      relations: ['authors', 'images', 'series', 'language', 'group', 'tags'],
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async searchAlbums(
    albumParams: AlbumPaginationQuery,
  ): PaginatedResponse<Album> {
    // const test = await getManager().query('SELECT * FROM album LEFT OUTER JOIN ')
    const query = await this.albumRepository.createQueryBuilder('album');
    const [data, total] = await buildAlbumPagination(albumParams, query);
    return { data, total, currentPage: albumParams.page };
  }

  async createAlbum(album: AlbumDto): Promise<Album> {
    const result = await this.albumRepository.save(album);
    return result;
  }

  async updateAlbum(album: AlbumDto) {
    const result = await this.albumRepository.save(album);
    return result;
  }

  async generateAlbum(
    albums: Record<HitomiFields, any[]>[],
    currentPageIndex: number,
  ) {
    let index = 0;
    for (const {
      title,
      authors,
      group,
      languages,
      series,
      tags,
      images,
      type,
    } of albums) {
      index++;
      this.logService.saveLog(
        `current album: ${index}/${albums.length}, current page index: ${currentPageIndex}`,
      );
      const album = await this.createAlbum({ name: title[0] });
      const albumPath = `public/images/${album.id}`;
      if (!fs.existsSync('public/images')) {
        fs.mkdirSync('public/images');
      }
      if (!fs.existsSync(albumPath)) {
        fs.mkdirSync(albumPath);
      }
      album.path = albumPath;
      if (authors.length) {
        const result = await this.authorsService.assignAuthorToAlbum(authors);
        album.authors = result;
      }
      if (tags.length) {
        const albumTags = await this.tagsService.generateAlbumTags(tags);
        album.tags = albumTags;
      }
      if (series.length) {
        const albumSeries = await this.seriesService.assignSeries(series[0]);
        album.series = albumSeries;
      }
      if (group.length) {
        const albumGroup = await this.groupService.assignGroup(group[0]);
        album.group = albumGroup;
      }
      if (languages.length) {
        const albumLanguage = await this.languageService.assignLanguage(
          languages[0],
        );
        album.language = albumLanguage;
      }
      if (images.length) {
        const albumImages = await this.imageService.assignImageToAlbum(
          images,
          albumPath,
        );
        album.images = albumImages;
      }
      const albumType = await this.typeService.assignType(type[0]);

      album.type = albumType;
      const finalAlbum = await this.albumRepository.save(album);
      tags.length && (await this.tagsService.assignAlbumToTag(finalAlbum));
      images.length && (await this.imageService.assignAlbumToImage(finalAlbum));
      authors.length &&
        (await this.authorsService.assignAlbumToAuthor(finalAlbum));
    }
  }
}
