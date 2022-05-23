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
  ) {}

  getAlbums(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['authors'] });
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
    } of albums) {
      const albumAuthors = [];
      const albumTags = [];
      const albumImages = [];
      const album = await this.createAlbum({ name: title[0] });
      const albumPath = `images/${album.id}`;

      for (const author of authors) {
        const albumAuthor = await this.authorsService.createAuthor({
          name: author,
        });
        albumAuthors.push(albumAuthor);
      }
      for (const image of images) {
        const adImage = await this.imageService.saveImage({});
        const imagePath = await this.imageService.writeImage(
          image,
          adImage.id,
          albumPath,
        );
        const albumImage = await this.imageService.saveImage({
          url: imagePath,
          name: adImage.id,
        });
        albumImages.push(albumImage);
      }
      for (const tag of tags) {
        const albumTag = await this.tagsService.createTag({
          name: tag,
        });
        albumTags.push(albumTag);
      }
      const albumSeries = await this.seriesService.createSeries({
        name: series[0],
      });
      const albumGroup = await this.groupService.createGroup({
        name: group[0],
      });
      const albumLanguage = await this.languageService.createLanguage({
        name: languages[0],
      });

      album.authors = albumAuthors;
      album.series = albumSeries;
      album.group = albumGroup;
      album.language = albumLanguage;
      album.tags = albumTags;
      album.path = albumPath;
      album.images = albumImages;
      album.name = album.id;
      await this.albumRepository.save(album);
    }
  }
}
