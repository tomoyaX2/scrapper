import { ApiProperty } from '@nestjs/swagger';

export class TagsDto {
  @ApiProperty()
  name: string;
}
