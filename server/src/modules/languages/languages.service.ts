import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  getLanguages(): Promise<Language[]> {
    return this.languagesRepository.find({
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
      await this.languagesRepository.save({
        ...album.language,
        albums: [...(album.language?.albums || []), album],
      });
    } catch (e) {
      this.logService.saveLog(
        `${e}, 'assign album to language error', ${JSON.stringify(album)}`,
        'warn',
      );
    }
  }
}
