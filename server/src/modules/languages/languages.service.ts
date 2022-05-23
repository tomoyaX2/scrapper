import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageDto } from './languages.dto';
import { Language } from './languages.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  getLanguages(): Promise<Language[]> {
    return this.languagesRepository.find();
  }

  async createLanguage(language: LanguageDto): Promise<void> {
    const result = await this.languagesRepository.save(language);
    console.log(result, 'language');
    return;
  }
}
