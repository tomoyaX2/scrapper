import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}

export class RegistrationDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  matchPassword: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatarUrl?: string;
  @ApiProperty()
  phone?: string;
}
