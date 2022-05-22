import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Get()
  getHello(): string {
    return this.languageService.init();
  }
}
