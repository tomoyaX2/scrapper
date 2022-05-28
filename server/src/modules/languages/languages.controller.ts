import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/types';
import { LanguageDto } from './languages.dto';
import { Language } from './languages.entity';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Get()
  getLanguages(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): PaginatedResponse<Language> {
    return this.languageService.getLanguages({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createLanguage(@Body() language: LanguageDto): Promise<Language> {
    return this.languageService.createLanguage(language);
  }
}
