/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DOMMouseMoveTracker from 'dom-lib/DOMMouseMoveTracker';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import useClassNames from './utils/useClassNames';
import mergeRefs from './utils/mergeRefs';

import Input from './Input';
import { Tooltip } from 'rsuite';

const Handle = React.forwardRef((props: any, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'slider',
    className,
    disabled,
    style,
    children,
    position,
    vertical,
    tooltip,
    rtl,
    value,
    role,
    tabIndex,
    renderTooltip,
    onDragStart,
    onDragMove,
    onDragEnd,
    onKeyDown,
    'data-range': dataRange,
    'data-key': dateKey,
    ...rest
  } = props;
  const [active, setActive] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const horizontalKey = rtl ? 'right' : 'left';
  const direction = vertical ? 'bottom' : horizontalKey;
  const styles = { ...style, [direction]: `${position}%` };
  const { merge, prefix } = useClassNames(classPrefix);
  const handleClasses = merge(className, prefix('handle'), { active });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouseMoveTracker = useRef<DOMMouseMoveTracker | null>();

  const releaseMouseMoves = useCallback(() => {
    mouseMoveTracker.current?.releaseMouseMoves();
    mouseMoveTracker.current = null;
  }, []);

  const setTooltipPosition = useCallback(() => {
    const tooltipElement = tooltipRef.current;

    if (tooltip && tooltipElement) {
      const width = getWidth(tooltipElement);
      addStyle(tooltipElement, 'left', `-${width / 2}px`);
    }
  }, [tooltip]);

  const handleDragMove = useCallback(
    (_deltaX: number, _deltaY: number, event: React.DragEvent) => {
      if (mouseMoveTracker.current?.isDragging()) {
        onDragMove?.(event, rootRef.current?.dataset);
        setTooltipPosition();
      }
    },
    [onDragMove, setTooltipPosition]
  );

  const handleDragEnd = useCallback(
    (event: React.MouseEvent) => {
      setActive(false);
      releaseMouseMoves();
      onDragEnd?.(event, rootRef.current?.dataset);
    },
    [onDragEnd, releaseMouseMoves]
  );

  const getMouseMoveTracker = useCallback(
    () =>
      mouseMoveTracker.current ??
      new DOMMouseMoveTracker(handleDragMove, handleDragEnd, document.body),
    [handleDragEnd, handleDragMove]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      mouseMoveTracker.current = getMouseMoveTracker();
      mouseMoveTracker.current?.captureMouseMoves(event);

      rootRef.current?.focus();

      setActive(true);
      onDragStart?.(event);
    },
    [disabled, getMouseMoveTracker, onDragStart]
  );

  const handleMouseEnter = useCallback(() => {
    console.log('123123123');
    setTooltipPosition();
  }, [setTooltipPosition]);

  useEffect(
    () => () => {
      releaseMouseMoves();
    },
    [releaseMouseMoves]
  );

  return (
    <Component
      role={role}
      tabIndex={tabIndex}
      ref={mergeRefs(ref, rootRef)}
      className={handleClasses}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseEnter}
      onKeyDown={onKeyDown}
      style={styles}
      data-range={dataRange}
      data-key={dateKey}
    >
      {tooltip && (
        <Tooltip
          aria-hidden='true'
          ref={tooltipRef}
          className={merge(prefix('tooltip'), 'placement-top')}
        >
          {renderTooltip ? renderTooltip(value) : value}
        </Tooltip>
      )}
      <Input tabIndex={-1} value={value} {...rest} />
      {children}
    </Component>
  );
});

Handle.displayName = 'Handle';
Handle.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  tooltip: PropTypes.bool,
  rtl: PropTypes.bool,
  position: PropTypes.number,
  value: PropTypes.number,
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onDragMove: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default Handle;
