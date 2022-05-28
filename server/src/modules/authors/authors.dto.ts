import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty()
  name: string;
}
