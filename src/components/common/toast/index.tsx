import { Notification } from 'rsuite';

const Toast = ({
  type,
  text,
  header
}: {
  type: 'success' | 'info' | 'error';
  text: string;
  header: string;
}) => (
  <Notification type={type} header={header} closable>
    {text}
  </Notification>
);

export { Toast };
