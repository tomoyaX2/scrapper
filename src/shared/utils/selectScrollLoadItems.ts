import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import {
  scrollTimeoutHandler,
  scrollTimeout
} from '@shared/utils/timeoutHandler';
import { AppDispatch, RootState } from 'src/store';
import {
  incrementAuthorsPage,
  decrementAuthorsPage,
  resetAuthorsPage
} from 'src/store/authors';
import {
  incrementGroupsPage,
  decrementGroupsPage,
  resetGroupsPage
} from 'src/store/groups';
import {
  incrementSeriesPage,
  decrementSeriesPage,
  resetSeriesPage
} from 'src/store/series';
import {
  incrementTagsPage,
  decrementTagsPage,
  resetTagsPage
} from 'src/store/tags';

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
    wrappedElement?.addEventListener('scroll', () =>
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

const buildMultiselectScrollArgs = ({
  dispatch,
  increment,
  decrement,
  reset
}: {
  dispatch: AppDispatch;
  increment: ActionCreatorWithoutPayload;
  decrement: ActionCreatorWithoutPayload;
  reset: ActionCreatorWithoutPayload;
}) => ({
  increment: () => {
    dispatch(increment());
  },
  decrement: () => {
    const data = dispatch(decrement()) as unknown as {
      state: RootState;
    };
    return data.state.tags.page - 1;
  },
  resetPage: () => {
    dispatch(reset());
  }
});

const useMultiselectScrollPropsFactory = (dispatch: AppDispatch) => {
  const tagScrollMultiselectProps = useMultiselectUpdateItemsInScroll(
    buildMultiselectScrollArgs({
      dispatch,
      increment: incrementTagsPage,
      decrement: decrementTagsPage,
      reset: resetTagsPage
    })
  );
  const authorScrollMultiselectProps = useMultiselectUpdateItemsInScroll(
    buildMultiselectScrollArgs({
      dispatch,
      increment: incrementAuthorsPage,
      decrement: decrementAuthorsPage,
      reset: resetAuthorsPage
    })
  );
  const seriesScrollMultiselectProps = useMultiselectUpdateItemsInScroll(
    buildMultiselectScrollArgs({
      dispatch,
      increment: incrementSeriesPage,
      decrement: decrementSeriesPage,
      reset: resetSeriesPage
    })
  );
  const groupsScrollMultiselectProps = useMultiselectUpdateItemsInScroll(
    buildMultiselectScrollArgs({
      dispatch,
      increment: incrementGroupsPage,
      decrement: decrementGroupsPage,
      reset: resetGroupsPage
    })
  );

  return {
    groupsScrollMultiselectProps,
    seriesScrollMultiselectProps,
    authorScrollMultiselectProps,
    tagScrollMultiselectProps
  };
};

export { useMultiselectScrollPropsFactory };
