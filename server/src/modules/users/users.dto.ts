import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatarUrl?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  access_token?: string;
  @ApiProperty()
  refresh_token?: string;
}
