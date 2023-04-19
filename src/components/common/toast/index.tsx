import { RefObject, forwardRef } from 'react';
import { Notification } from 'rsuite';

const Toast = forwardRef(
  (
    {
      type,
      text,
      header
    }: {
      type: 'success' | 'info' | 'error';
      text: string;
      header: string;
    },
    ref:
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null
      | undefined
  ) => (
    <Notification type={type} header={header} closable ref={ref}>
      {text}
    </Notification>
  )
);

export { Toast };
