import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Errors } from 'src/errors/auth';
import { AuthService } from './auth.service';
import { isValidRegistrationInput } from './utils';

@Injectable()
export class RegistrationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return isValidRegistrationInput(request.body);
  }
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.validateAccessToken(
      request.headers.access_token,
    );
    if (!user) {
      throw new UnauthorizedException(Errors.authErrors.invalidToken);
    }
    request.sub = user.id;
    return true;
  }
}
