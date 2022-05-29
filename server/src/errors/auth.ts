import { HttpStatus } from '@nestjs/common';

export const Errors = {
  unknownError: {
    message: 'Unknown error',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  loginErrors: {
    incorrentInput: {
      message: 'Email or Password is incorrect',
      status: HttpStatus.UNAUTHORIZED,
    },
  },
  registrationErrors: {
    invalidPassword: {
      message:
        "Password shouldn't have less that 6 symbols and more than 32 symbols, contains 1 uppercase letter and 1 number",
      status: HttpStatus.BAD_REQUEST,
    },
    invalidLogin: {
      message: "Login shouldn't be empty or longer than 32 symbols",
      status: HttpStatus.BAD_REQUEST,
    },
    passwordsDontMatch: {
      message: "Passwords doesn't match",
      status: HttpStatus.BAD_REQUEST,
    },
    invalidPhone: {
      message: 'Phone has invalid format',
      status: HttpStatus.BAD_REQUEST,
    },
  },
  authErrors: {
    invalidToken: {
      message: 'Unauthorized',
      status: HttpStatus.UNAUTHORIZED,
    },
  },
};
