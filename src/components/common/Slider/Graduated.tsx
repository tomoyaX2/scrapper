/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import PropTypes from 'prop-types';
import useClassNames from './utils/useClassNames';
import Mark from './Mark';

const precisionMath = (value: number) => parseFloat(value.toFixed(10));

const Graduated = React.forwardRef((props: any, ref) => {
  const {
    as: Component = 'div',
    step,
    min,
    max,
    count,
    value,
    classPrefix = 'slider',
    className,
    renderMark
  } = props;
  const { merge, prefix } = useClassNames(classPrefix);
  const activeIndexs: number[] = [];

  let startIndex = 0;
  let endIndex = 0;

  if (Array.isArray(value)) {
    const [start, end] = value;

    startIndex = precisionMath(start / step - min / step);
    endIndex = precisionMath(end / step - min / step);
    activeIndexs.push(
      precisionMath(Math.ceil(((start - min) / (max - min)) * count))
    );
    activeIndexs.push(
      precisionMath(Math.ceil(((end - min) / (max - min)) * count))
    );
  } else {
    endIndex = precisionMath(value / step - min / step);
    activeIndexs.push(
      precisionMath(Math.ceil(((value - min) / (max - min)) * count))
    );
  }

  const graduatedItems: React.ReactElement[] = [];

  for (let i = 0; i < count; i += 1) {
    const classes = prefix({
      pass: i >= startIndex && i <= endIndex,
      active: ~activeIndexs.indexOf(i)
    });

    const mark = precisionMath(i * step + min);
    const lastMark = Math.min(max, mark + step);
    const last = i === count - 1;

    graduatedItems.push(
      <li className={classes} key={i}>
        <Mark mark={mark} renderMark={renderMark} />
        {last ? (
          <Mark mark={lastMark} renderMark={renderMark} last={last} />
        ) : null}
      </li>
    );
  }

  const classes = merge(className, prefix('graduator'));

  return (
    <Component ref={ref} className={classes}>
      <ol>{graduatedItems}</ol>
    </Component>
  );
});

Graduated.displayName = 'Graduated';
Graduated.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  count: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  renderMark: PropTypes.func
};

export default Graduated;
