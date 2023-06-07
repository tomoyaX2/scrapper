/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import useClassNames from './utils/useClassNames';

const Mark = React.forwardRef((props: any, ref) => {
  const {
    as: Component = 'span',
    mark,
    last,
    classPrefix = 'slider-mark',
    className,
    renderMark
  } = props;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ last }));

  if (renderMark) {
    return (
      <Component ref={ref} className={classes}>
        <span className={prefix('content')}>{renderMark(mark)}</span>
      </Component>
    );
  }

  return null;
});

Mark.displayName = 'Mark';

export default Mark;
