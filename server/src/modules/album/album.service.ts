import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { Repository } from 'typeorm';
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
import { map } from 'cheerio/lib/api/traversing';

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
  ) {}

  getAlbums(): Promise<Album[]> {
    return this.albumRepository.find({
      relations: ['authors', 'images', 'series', 'language', 'group', 'tags'],
    });
  }

  async createAlbum(album: AlbumDto): Promise<Album> {
    const result = await this.albumRepository.save(album);
    return result;
  }

  async updateAlbum(album: AlbumDto) {
    const result = await this.albumRepository.save(album);
    return result;
  }

  async generateAlbum(albums: Record<HitomiFields, any[]>[]) {
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
      const album = await this.createAlbum({ name: title[0] });
      const albumPath = `images/${album.id}`;
      if (!fs.existsSync('images')) {
        fs.mkdirSync('images');
      }
      if (!fs.existsSync(albumPath)) {
        fs.mkdirSync(albumPath);
      }
      if (authors.length) {
        const result = await this.authorsService.assignAuthorToAlbum(authors);
        album.authors = result;
      }
      if (tags.length) {
        const albumTags = await this.tagsService.generateAlbumTags(tags);
        album.tags = albumTags;
      }
      if (images.length) {
        const albumImages = await this.imageService.assignImageToAlbum(
          images,
          albumPath,
        );
        album.images = albumImages;
      }
      if (series.length) {
        const albumSeries = await this.seriesService.assignSeries(series[0]);
        album.series = albumSeries;
      }
      if (group.length) {
        const albumGroup = await this.groupService.assignGroup(group[0]);
        album.group = albumGroup;
      }
      const albumLanguage = await this.languageService.assignLanguage(
        languages[0],
      );

      const albumType = await this.typeService.assignType(type[0]);

      album.type = albumType;

      album.language = albumLanguage;

      album.path = albumPath;
      const albumResult = await this.albumRepository.save(album);
      tags.length && (await this.tagsService.assignAlbumToTag(albumResult));
      images.length &&
        (await this.imageService.assignAlbumToImage(albumResult));
      series.length &&
        (await this.seriesService.assignAlbumToSeries(albumResult));
      authors.length &&
        (await this.authorsService.assignAlbumToAuthor(albumResult));
      group.length && (await this.groupService.assignAlbumToGroup(albumResult));
      languages.length &&
        (await this.languageService.assignAlbumToLanguage(albumResult));
      type.length && (await this.typeService.assignAlbumToType(albumResult));
    }
  }
}
