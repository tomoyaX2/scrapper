let switchPageIndexTimeout = setTimeout(() => {});
let searchTimeout = setTimeout(() => {});

let scrollTimeout = setTimeout(() => {});

const switchPageTimeoutHandler = ({
  time,
  changeReaderPage,
  currentPage,
  totalPages
}: {
  time: number;
  changeReaderPage: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}) => {
  if (!isNaN(time) && time > 0) {
    clearTimeout(switchPageIndexTimeout);

    if (totalPages > currentPage && typeof time === 'number') {
      switchPageIndexTimeout = setTimeout(() => {
        changeReaderPage(currentPage + 1);
        switchPageTimeoutHandler({
          time,
          changeReaderPage,
          currentPage: currentPage + 1,
          totalPages
        });
      }, time * 1000);

      return;
    }
  }
  clearTimeout(switchPageIndexTimeout);
};

const searchTimeoutHandler = (searchCallback: () => void) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => searchCallback(), 1000);
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
