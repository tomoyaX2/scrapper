import type { IconProps } from './icons.props';

export const Spinner = (props: IconProps): JSX.Element => (
  <svg
    width='100px'
    height='100px'
    viewBox='0 0 100 100'
    fill='#fff'
    {...props}
  >
    <circle
      cx='50'
      cy='50'
      r='35'
      strokeWidth='10'
      stroke='#fff'
      strokeLinecap='round'
      fill='none'
    >
      <animate
        attributeName='stroke-dashoffset'
        from='0'
        to='502'
        dur='2s'
        repeatCount='indefinite'
      />
      <animate
        attributeName='stroke-dasharray'
        from='150.6 100.4'
        to='1 250'
        dur='2s'
        repeatCount='indefinite'
      />
    </circle>
  </svg>
);
