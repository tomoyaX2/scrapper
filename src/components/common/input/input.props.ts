export type InputProps = {
  inputClassName?: string;
  value?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  name?: string;
  type?: string;
  labelClassName?: string;
  label?: string;
  icon?: JSX.Element;
  className?: string;
};
