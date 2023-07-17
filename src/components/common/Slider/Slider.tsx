/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useCallback, useMemo, useRef } from 'react';
import getWidth from 'dom-lib/getWidth';
import getHeight from 'dom-lib/getHeight';
import getOffset from 'dom-lib/getOffset';
import ProgressBar from './ProgressBar';
import Handle from './Handle';
import Graduated from './Graduated';
import useControlled from './utils/useControlled';
import useClassNames from './utils/useClassNames';
import { precisionMath, checkValue } from './utils/utils';
import Plaintext from './Plaintext';

const Slider = React.forwardRef((props: any, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    as: Componnet = 'div',
    graduated,
    className,
    barClassName,
    progress,
    vertical,
    disabled,
    readOnly,
    plaintext,
    classPrefix = 'slider',
    min = 0,
    handleClassName,
    handleStyle,
    handleTitle,
    tooltip = true,
    step = 1,
    defaultValue = 0,
    value: valueProp,
    max: maxProp = 100,
    getAriaValueText,
    renderTooltip,
    renderMark,
    onChange,
    onChangeCommitted,
    onMouseMoveDataHandler,
    onMouseLeaveDataHandler,
    prefill,
    ...rest
  } = props;

  const barRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rtl = false;

  const classes = merge(
    className,
    withClassPrefix({
      vertical,
      disabled,
      readOnly,
      graduated,
      'with-mark': renderMark
    })
  );

  const max = useMemo(
    () => precisionMath(Math.floor((maxProp - min) / step) * step + min),
    [maxProp, min, step]
  );

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  const getValidValue = useCallback(
    (value: number | undefined) => checkValue(value, min, max),
    [max, min]
  );

  const [value, setValue] = useControlled(
    getValidValue(valueProp),
    getValidValue(defaultValue) as number
  );
  const count = useMemo(
    () => precisionMath((max - min) / step),
    [max, min, step]
  );

  // Get the height of the progress bar
  const getBarHeight = useCallback(
    () => (barRef.current ? getHeight(barRef.current) : 0),
    []
  );
  // Get the width of the progress bar
  const getBarWidth = useCallback(
    () => (barRef.current ? getWidth(barRef.current) : 0),
    []
  );

  const getValueByOffset = useCallback(
    (offset: number) => {
      let value = 0;

      if (isNaN(offset)) {
        return value;
      }

      if (vertical) {
        const barHeight = getBarHeight();
        value = Math.round(offset / (barHeight / count)) * step;
      } else {
        const barWidth = getBarWidth();
        value = Math.round(offset / (barWidth / count)) * step;
      }

      return precisionMath(value);
    },
    [count, getBarHeight, getBarWidth, step, vertical]
  );

  /**
   * A value within the valid range is calculated from the position triggered by the event.
   */
  const getValueByPosition = useCallback(
    (event: React.MouseEvent) => {
      const barOffset = getOffset(barRef.current) ?? {
        top: 0,
        height: 0,
        left: 0,
        width: 0
      };
      const offset = vertical
        ? barOffset.top + barOffset.height - event.pageY
        : event.pageX - barOffset.left;
      const offsetValue = rtl && !vertical ? barOffset.width - offset : offset;

      return getValueByOffset(offsetValue) + min;
    },
    [getValueByOffset, min, rtl, vertical]
  );

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  const handleChangeValue = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readOnly) {
        return;
      }
      const nextValue = getValidValue(getValueByPosition(event)) as number;
      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChange, readOnly, setValue]
  );

  /**
   * Callback function that is fired when the mouseup is triggered
   */
  const handleChangeCommitted = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readOnly) {
        return;
      }
      const nextValue = getValidValue(getValueByPosition(event)) as number;

      onChangeCommitted?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChangeCommitted, readOnly]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let nextValue;
      const increaseKey = rtl ? 'ArrowLeft' : 'ArrowRight';
      const decreaseKey = rtl ? 'ArrowRight' : 'ArrowLeft';

      switch (event.key) {
        case 'Home':
          nextValue = min;
          break;
        case 'End':
          nextValue = max;
          break;
        case increaseKey:
        case 'ArrowUp':
          nextValue = Math.min(max, value + step);
          break;

        case decreaseKey:
        case 'ArrowDown':
          nextValue = Math.max(min, value - step);
          break;
        default:
          return;
      }

      // Prevent scroll of the page
      event.preventDefault();

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [max, min, onChange, rtl, setValue, step, value]
  );

  if (plaintext) {
    return (
      <Plaintext localeKey='notSelected' ref={ref}>
        {value}
      </Plaintext>
    );
  }

  return (
    <Componnet {...rest} ref={ref} className={classes} role='presentation'>
      <div
        ref={barRef}
        className={merge(barClassName, prefix('bar'))}
        onClick={handleChangeValue}
        onMouseMove={(event: any) => {
          if (onMouseMoveDataHandler) {
            const pos = getValidValue(getValueByPosition(event));
            onMouseMoveDataHandler(pos);
          }
        }}
        onMouseLeave={onMouseLeaveDataHandler}
      >
        {progress && (
          <ProgressBar
            rtl={rtl}
            vertical={vertical}
            className={`z-10 h-full bg-white-300`}
            start={0}
            end={((value - min) / (max - min)) * 100}
          />
        )}
        {prefill ? (
          <ProgressBar
            rtl={rtl}
            vertical={vertical}
            className='bg-gray-600 h-full'
            start={0}
            end={((prefill - min) / (max - min)) * 100}
          />
        ) : (
          ''
        )}
        {graduated && (
          <Graduated
            step={step}
            min={min}
            max={max}
            count={count}
            value={value}
            renderMark={renderMark}
          />
        )}
      </div>
      {
        <Handle
          position={((value - min) / (max - min)) * 100}
          className={handleClassName}
          style={handleStyle}
          disabled={disabled}
          tooltip={tooltip}
          rtl={rtl}
          value={value}
          renderTooltip={renderTooltip}
          onDragMove={handleChangeValue}
          onKeyDown={handleKeyDown}
          onDragEnd={handleChangeCommitted}
          tabIndex={disabled || readOnly ? undefined : 0}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          aria-valuenow={value}
          aria-disabled={disabled}
          aria-valuetext={
            getAriaValueText ? getAriaValueText(value) : ariaValuetext
          }
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuemax={max}
          aria-valuemin={min}
        >
          {handleTitle}
        </Handle>
      }
    </Componnet>
  );
});

Slider.displayName = 'Slider';

export default Slider;
