import type { IconProps } from './icons.props';

export const StarIcon = (props: IconProps): JSX.Element => (
  <svg
    focusable='false'
    viewBox='0 0 24 24'
    aria-hidden='true'
    role='presentation'
    {...props}
  >
    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
  </svg>
);
