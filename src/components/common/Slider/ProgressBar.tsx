/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import useClassNames from './utils/useClassNames';

const ProgressBar = React.forwardRef((props: any, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'slider-progress-bar',
    vertical,
    rtl,
    end = 0,
    start = 0,
    style,
    className
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);

  const sizeKey = vertical ? 'height' : 'width';
  const dirKey = rtl ? 'right' : 'left';
  const startKey = vertical ? 'bottom' : dirKey;

  const styles = {
    ...style,
    [startKey]: `${start}%`,
    [sizeKey]: `${end - start}%`
  };
  const classes = merge(className, withClassPrefix());

  return <Component ref={ref} style={styles} className={classes} />;
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
