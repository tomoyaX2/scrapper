import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { LanguageDto } from './languages.dto';
import { Language } from './languages.entity';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Get()
  getLanguages(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: string,
  ): PaginatedResponse<Language> {
    return this.languageService.getLanguages({ page, perPage, name });
  }

  @Post()
  createLanguage(language: LanguageDto): Promise<Language> {
    return this.languageService.createLanguage(language);
  }
}
