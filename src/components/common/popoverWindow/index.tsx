import { Popover, Whisper, Button } from 'rsuite';
import { forwardRef } from 'react';

const DefaultPopover = forwardRef(
  ({ content, ...props }: { content: JSX.Element }, ref) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Popover ref={ref as any} {...props}>
      {content}
    </Popover>
  )
);

const PopoverWindow = ({
  placement,
  content,
  children
}: {
  placement: 'bottom';
  content: JSX.Element;
  children: JSX.Element;
}) => (
  <Whisper
    trigger='click'
    placement={placement}
    speaker={<DefaultPopover content={content} />}
  >
    <Button appearance='subtle'>{children}</Button>
  </Whisper>
);

export { PopoverWindow };
