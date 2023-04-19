import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToaster } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { clearRedirect } from 'src/store/navigation';
import { hideNotification } from 'src/store/notifications';
import { Toast } from '../common/toast';

let timeout = setTimeout(() => {}, 0);

const useStoreEffects = () => {
  const dispatch = useAppDispatch();
  const { to } = useAppSelector(state => state.navigation);
  const router = useRouter();
  const toaster = useToaster();

  useEffect(() => {
    to && router.push(to);
    dispatch(clearRedirect());
  }, [to]);

  const { text, type, header, placement, isVisible } = useAppSelector(
    state => state.notifications
  );

  useEffect(() => {
    if (isVisible) {
      clearTimeout(timeout);
      toaster.push(<Toast type={type} header={header} text={text} />, {
        placement
      });
      timeout = setTimeout(() => {
        toaster.clear();
        dispatch(hideNotification());
      }, 3000);
    }
  }, [isVisible]);
};

export { useStoreEffects };
