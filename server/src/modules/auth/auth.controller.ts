import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoginErrors } from 'src/errors/auth';
import { ErrorResponses } from 'src/errors/utils';
import { LoginDto, RegistrationDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse(ErrorResponses.internalError())
  @ApiResponse(
    ErrorResponses.unauthorized({
      Unauthorized: { value: { statusCode: 200, message: 'test' } },
    }),
  )
  @ApiResponse(ErrorResponses.unauthorized(LoginErrors.emptyInput))
  @ApiResponse(ErrorResponses.unauthorized(LoginErrors.incorrectInput))
  @Post('/login')
  getUsers(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @ApiResponse(ErrorResponses.internalError())
  @Post('/registration')
  getUserById(@Body() data: RegistrationDto) {
    return this.authService.registration(data);
  }
}
