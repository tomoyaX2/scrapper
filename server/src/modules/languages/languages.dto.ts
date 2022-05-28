import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  @ApiProperty()
  name: string;
}
