import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LanguageDto, PaginatedLanguageDto } from './languages.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Get()
  getLanguages(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name: string,
  ): Promise<PaginatedLanguageDto> {
    return this.languageService.getLanguages({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
    });
  }

  @Post()
  createLanguage(@Body() language: LanguageDto): Promise<LanguageDto> {
    return this.languageService.createLanguage(language);
  }
}
