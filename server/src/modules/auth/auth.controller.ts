import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Errors } from 'src/errors/auth';
import { ErrorResponses } from 'src/errors/utils';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginDto, RegistrationDto } from './auth.dto';
import { AccessTokenGuard, RegistrationGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse(ErrorResponses.internalError())
  @ApiResponse(ErrorResponses.unauthorized(Errors.loginErrors.incorrentInput))
  @Post('/login')
  getUsers(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @ApiResponse(ErrorResponses.internalError())
  @ApiResponse(ErrorResponses.badRequest(Errors.registrationErrors))
  @UseGuards(RegistrationGuard)
  @Post('/registration')
  getUserById(@Body() data: RegistrationDto) {
    return this.authService.registration(data);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('/logout')
  logout(@Req() req) {
    return this.authService.logout(req.sub);
  }

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  getUserByToken(@Req() req): Promise<User> {
    return this.usersService.getUserById(req.sub);
  }
}
