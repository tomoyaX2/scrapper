export type SelectProps = {
  name?: string;
  value?: string;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  children?: JSX.Element[];
  onChange: (value: string) => void;
};

export type OptionProps = {
  value?: string;
  children?: string;
};
