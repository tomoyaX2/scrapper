import type { ChangeEventHandler } from 'react';

export type InputProps = {
  inputClassName?: string;
  value?: string;
  containerClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  placeholder?: string;
  name?: string;
  type?: string;
  labelClassName?: string;
  label?: string;
  icon?: JSX.Element;
};
