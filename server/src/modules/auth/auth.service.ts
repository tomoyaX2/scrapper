import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegistrationDto, TokenReturnDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { Errors } from 'src/errors/auth';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login({ login, password }: LoginDto): Promise<TokenReturnDto> {
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

  async saveUserToken(user: UserDto) {
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1314000s',
    });
    user.access_token = 'accessToken';
    await this.usersService.saveUser(user);
    return accessToken;
  }

  async registration(data: RegistrationDto): Promise<{ accessToken: string }> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.usersService.saveUser({ ...data, password: hash });
    const accessToken = await this.saveUserToken(user);
    return {
      accessToken,
    };
  }

  async validateAccessToken(token: string) {
    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as jwt.JwtPayload;
    const user = await this.usersService.getUserById(tokenData.sub);
    return user;
  }

  async logout(userId: string): Promise<void> {
    const user = await this.usersService.getUserById(userId);
    this.usersService.saveUser({ ...user, access_token: null });
  }
}
