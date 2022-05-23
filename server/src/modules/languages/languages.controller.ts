import { Controller, Get, Post } from '@nestjs/common';
import { LanguageDto } from './languages.dto';
import { Language } from './languages.entity';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Get()
  getLanguages(): Promise<Language[]> {
    return this.languageService.getLanguages();
  }

  @Post()
  createLanguage(language: LanguageDto): Promise<Language> {
    return this.languageService.createLanguage(language);
  }
}
