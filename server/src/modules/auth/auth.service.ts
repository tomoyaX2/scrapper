import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegistrationDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Errors } from 'src/errors/auth';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ login, password }: LoginDto) {
    const user = await this.usersService.getUserByLogin(login);
    if (!user) {
      throw new UnauthorizedException(Errors.loginErrors.incorrentInput);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const accessToken = await this.saveUserToken(user);
      return {
        accessToken,
      };
    }
    throw new UnauthorizedException(Errors.loginErrors.incorrentInput);
  }

  async saveUserToken(user: User) {
    const accessToken = this.jwtService.sign({ sub: user.id });
    await this.usersService.saveUser({ ...user, access_token: accessToken });
    return accessToken;
  }

  async registration({
    email,
    login,
    password,
    name,
    avatarUrl,
    phone,
  }: RegistrationDto): Promise<{ accessToken: string }> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const user = await this.usersService.saveUser({
      email,
      login,
      password: hash,
      name,
      avatarUrl,
      phone,
    });
    const accessToken = await this.saveUserToken(user);
    return {
      accessToken,
    };
  }

  async validateAccessToken(token: string) {
    const tokenData = this.jwtService.verify(token);
    const user = await this.usersService.getUserById(tokenData.sub);
    return user;
  }

  async logout(userId: string): Promise<void> {
    const user = await this.usersService.getUserById(userId);
    this.usersService.saveUser({ ...user, access_token: null });
  }
}
