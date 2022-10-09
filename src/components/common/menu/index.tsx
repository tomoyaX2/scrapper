import { Popover, Whisper } from 'rsuite';
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
  children,
  trigger
}: {
  placement: 'bottom' | 'top' | 'right';
  content: JSX.Element;
  children: JSX.Element;
  trigger?: 'hover' | 'click';
}) => (
  <Whisper
    placement={placement}
    trigger={trigger ?? 'click'}
    speaker={<DefaultPopover content={content} />}
  >
    {children}
  </Whisper>
);

export { PopoverWindow };
