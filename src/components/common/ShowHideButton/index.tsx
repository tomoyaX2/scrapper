import { Button } from 'rsuite';
import { ShowMoreButtonProps } from './types';

const ShowMoreButton = ({
  isVisible,
  action,
  active,
  className
}: ShowMoreButtonProps) => {
  if (!isVisible) {
    return null;
  }
  return active ? (
    <Button className={'rs-tag-md ' + className} onClick={() => action(false)}>
      Hide
    </Button>
  ) : (
    <Button
      className={'rs-tag-md underline ' + className}
      onClick={() => action(true)}
    >
      Show more
    </Button>
  );
};

export { ShowMoreButton };
