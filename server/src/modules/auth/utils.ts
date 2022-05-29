import { BadRequestException } from '@nestjs/common';
import { Errors } from 'src/errors/auth';

export const isValidRegistrationInput = ({
  password,
  matchPassword,
  phone,
}: {
  password: string;
  matchPassword: string;
  phone: string;
}) => {
  const isValid = true;
  const passwordMatchRequirements = password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  );
  const phoneMatchREgExp = phone
    ? phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{6})$/)
    : true;
  if (!passwordMatchRequirements) {
    throw new BadRequestException(Errors.registrationErrors.invalidPassword);
  }
  if (password !== matchPassword) {
    throw new BadRequestException(Errors.registrationErrors.passwordsDontMatch);
  }
  if (!phoneMatchREgExp) {
    throw new BadRequestException(Errors.registrationErrors.invalidPhone);
  }
  return isValid;
};
