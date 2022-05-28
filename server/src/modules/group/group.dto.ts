import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty()
  name: string;
}
