import type { IconProps } from './icons.props';

export const TrashIcon = (props: IconProps): JSX.Element => (
  <svg
    focusable='false'
    viewBox='0 0 16 16'
    aria-hidden='true'
    role='presentation'
    {...props}
  >
    <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z'
      />
    </svg>
  </svg>
);
