import { HttpStatus } from '@nestjs/common';

export const LoginErrors = {
  incorrectInput: {
    message: 'Email or Password is incorrect',
    status: HttpStatus.UNAUTHORIZED,
  },
  emptyInput: {
    message: 'Email and password are required',
    status: HttpStatus.UNAUTHORIZED,
  },
};

export const RegistrationErrors = {
  invalidPassword: {
    errors: [
      {
        password:
          "Password shouldn't have less that 6 symbols and more than 32 symbols",
      },
    ],
    invalidLogin: {
      errors: [
        {
          login: "Login shouldn't be empty or longer than 32 symbols",
        },
      ],
    },
    passwordsDontMatch: {
      errors: [
        {
          password: "Passwords doesn't match",
          matchPassword: "Passwords doesn't match",
        },
      ],
    },
  },
};
