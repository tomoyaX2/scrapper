import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegistrationDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login({ login, password }: LoginDto) {
    return;
  }

  async registration({
    email,
    login,
    password,
    name,
    avatarUrl,
    phone,
  }: RegistrationDto) {
    return;
  }
}
