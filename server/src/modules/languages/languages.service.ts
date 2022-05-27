import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumRelations } from 'src/shared/constants';
import { DefaultPaginationQuery, PaginatedResponse } from 'src/shared/types';
import { Like, Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { LogService } from '../log/log.service';
import { LanguageDto } from './languages.dto';
import { Language } from './languages.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
    private logService: LogService,
  ) {}

  async getLanguages({
    page,
    perPage,
    name,
  }: DefaultPaginationQuery): PaginatedResponse<Language> {
    const [data, total] = await this.languagesRepository.findAndCount({
      where: name ? { name: Like('%' + name + '%') } : {},
      relations: albumRelations,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async createLanguage(language: LanguageDto): Promise<Language> {
    try {
      return await this.languagesRepository.save(language);
    } catch (e) {}
  }

  async assignLanguage(name: string): Promise<Language> {
    try {
      const language = await this.languagesRepository.findOne({ name });
      if (language?.name) {
        return language;
      }
      return await this.languagesRepository.save({ name });
    } catch (e) {}
  }

  async assignAlbumToLanguage(album: Album): Promise<void> {
    try {
      const targetLanguage = await this.languagesRepository.findOne({
        id: album.language.id,
      });
      console.log(targetLanguage, 'targetLanguage');
      await this.languagesRepository.save({
        ...targetLanguage,
        albums: [...(targetLanguage?.albums || []), album],
      });
    } catch (e) {
      this.logService.saveLog(
        `${e}, 'assign album to language error', ${JSON.stringify(album)}`,
        'warn',
      );
    }
  }
}
