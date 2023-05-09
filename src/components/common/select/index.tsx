import { OptionProps, SelectProps } from './select.props';
import cn from 'classnames';

export const Select = ({
  name,
  value,
  inputClassName,
  containerClassName,
  labelClassName,
  children,
  label,
  onChange,
  ...props
}: SelectProps): JSX.Element => (
  <div
    className={cn(
      'relative flex flex-row items-center border-b-2 w-85',
      containerClassName
    )}
  >
    <select
      onChange={e => onChange(e.target.value)}
      name={name}
      value={value}
      className={cn(
        'block pt-2 pb-1 px-2 mr-3 w-30 text-right text-x text-white-300 bg-transparent focus:outline-none ',
        inputClassName
      )}
      {...props}
    >
      {children}
    </select>
    {label && (
      <label
        htmlFor={name}
        className={cn(
          'text-m block w-full text-x text-white-300 bg-transparent',
          labelClassName
        )}
      >
        {label}
      </label>
    )}
  </div>
);

export const Option = ({
  value,
  children,
  ...props
}: OptionProps): JSX.Element => (
  <option
    value={value}
    className='bg-stone-900 hover:bg-stone-300 text-center border-1 border-current '
    {...props}
  >
    {children}
  </option>
);
