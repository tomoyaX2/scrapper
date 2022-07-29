import {
  scrollTimeoutHandler,
  scrollTimeout
} from '@shared/utils/timeoutHandler';

const useMultiselectUpdateItemsInScroll = ({
  increment,
  decrement,
  resetPage
}: {
  increment: () => void;
  decrement: () => number;
  resetPage: () => void;
}) => {
  const handleMenuScroll = () => {
    const wrappedElement = document.getElementsByClassName(
      'rs-picker-check-menu rs-picker-check-menu-items'
    )[0];

    if (wrappedElement) {
      const endScrollCounter =
        wrappedElement.scrollHeight -
        (wrappedElement.clientHeight + Math.floor(wrappedElement.scrollTop));

      if (
        Math.floor(wrappedElement.scrollTop) < 10 &&
        wrappedElement.scrollHeight / 2 > 1000
      ) {
        const page = decrement();
        if (page !== 1)
          setTimeout(
            () => (wrappedElement.scrollTop = wrappedElement.scrollHeight / 2),
            0
          );

        return;
      }

      if (endScrollCounter < 10) {
        increment();

        return;
      }
    }
  };

  const onEnter = () => {
    const wrappedElement = document.getElementsByClassName(
      'rs-picker-check-menu rs-picker-check-menu-items'
    )[0];
    wrappedElement.addEventListener('scroll', () =>
      scrollTimeoutHandler(handleMenuScroll)
    );
  };

  const onExit = () => {
    document.removeEventListener('scroll', handleMenuScroll);
    resetPage();
    clearTimeout(scrollTimeout);
  };

  return { onEnter, onExit };
};

export { useMultiselectUpdateItemsInScroll };
