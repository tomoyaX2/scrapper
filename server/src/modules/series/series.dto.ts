import { ApiProperty } from '@nestjs/swagger';

export class SeriesDto {
  @ApiProperty()
  name: string;
}
