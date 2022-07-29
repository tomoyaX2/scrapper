import type { Search } from './pagination';

let switchPageIndexTimeout = setTimeout(() => {});
let searchTimeout = setTimeout(() => {});

let scrollTimeout = setTimeout(() => {});

const switchPageTimeoutHandler = ({
  time,
  onChangeReaderPage,
  currentPage,
  totalPages
}: {
  time: number;
  onChangeReaderPage: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}) => {
  if (!isNaN(time) && time > 0) {
    clearTimeout(switchPageIndexTimeout);

    if (totalPages > currentPage && typeof time === 'number') {
      switchPageIndexTimeout = setTimeout(() => {
        onChangeReaderPage(currentPage + 1);
        switchPageTimeoutHandler({
          time,
          onChangeReaderPage,
          currentPage: currentPage + 1,
          totalPages
        });
      }, time * 1000);

      return;
    }
  }
  clearTimeout(switchPageIndexTimeout);
};

const searchTimeoutHandler =
  (searchCallback: (data: Search) => void) => (data: Search) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => searchCallback(data), 1000);
  };

const scrollTimeoutHandler = (callback: () => void) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => callback(), 500);

  return () => {};
};
export {
  searchTimeoutHandler,
  switchPageTimeoutHandler,
  scrollTimeoutHandler,
  scrollTimeout
};
