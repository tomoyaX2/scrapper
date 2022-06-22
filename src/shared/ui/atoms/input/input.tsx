import cn from 'classnames';

import type { InputProps } from './input.props';

export const Input = ({
  inputClassName,
  labelClassName,
  label,
  name,
  icon,
  containerClassName,
  ...props
}: InputProps): JSX.Element => (
  <div
    className={cn(
      'relative z-0 group mr-12 flex flex-row items-center border-gray-300 border-b-2',
      containerClassName
    )}
  >
    <input
      type='text'
      name={name}
      id='floating_first_name'
      className={cn(
        'block pt-2 pb-1 px-0 w-full text-sm text-white-300 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white-300 peer',
        inputClassName
      )}
      {...props}
    />
    {label && (
      <label
        htmlFor={name}
        className={cn(
          'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white-300  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
          labelClassName
        )}
      >
        {label}
      </label>
    )}
    {icon && icon}
  </div>
);
