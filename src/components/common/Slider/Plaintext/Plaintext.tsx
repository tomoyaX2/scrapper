/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import useClassNames from '../utils/useClassNames';

/**
 *  Make the component display in plain text, and display default characters when there is no children.
 */
const Plaintext = React.forwardRef((props: any, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'plaintext',
    className,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ empty: !children }));

  return (
    <Component {...rest} ref={ref} className={classes}>
      {children ? children : ''}
    </Component>
  );
});

Plaintext.displayName = 'Plaintext';

export default Plaintext;
