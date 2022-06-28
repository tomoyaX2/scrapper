let switchPageIndexTimeout = setTimeout(() => {});

export const switchPageTimeoutHandler = ({
  isActive,
  value,
  onChangeReaderPage,
  currentPage,
  totalPages
}: {
  isActive: boolean;
  value: number | string;
  onChangeReaderPage: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
}) => {
  if (isActive) {
    clearTimeout(switchPageIndexTimeout);

    if (totalPages > currentPage && typeof value === 'number') {
      switchPageIndexTimeout = setTimeout(() => {
        onChangeReaderPage(currentPage + 1);
        switchPageTimeoutHandler({
          isActive,
          value,
          onChangeReaderPage,
          currentPage: currentPage + 1,
          totalPages
        });
      }, value * 1000);

      return;
    }
  }
  clearTimeout(switchPageIndexTimeout);
};
