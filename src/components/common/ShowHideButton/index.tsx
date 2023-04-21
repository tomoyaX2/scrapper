import { Button } from 'rsuite';
import { ShowMoreButtonProps } from './types';

const ShowMoreButton = ({ isVisible, action, active }: ShowMoreButtonProps) => {
  if (!isVisible) {
    return null;
  }
  return active ? (
    <Button className='rs-tag-md' onClick={() => action(false)}>
      Hide
    </Button>
  ) : (
    <Button className='rs-tag-md underline' onClick={() => action(true)}>
      Show more
    </Button>
  );
};

export { ShowMoreButton };
