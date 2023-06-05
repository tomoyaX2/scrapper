import { Button } from 'rsuite';
import { ArrowTop } from '../icons/arrowTop';
import { useEffect, useState } from 'react';

const ScrollToUpArrow = () => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowScrollArrow(true);
      } else {
        setShowScrollArrow(false);
      }
    });
  }, []);

  const [showScrollArrow, setShowScrollArrow] = useState<boolean>(false);

  const handleScrollToUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='fixed lg:right-20 md:right-4 xsm:right-1 bottom-20  animate-bounce'>
      {showScrollArrow && (
        <Button onClick={handleScrollToUp}>
          <ArrowTop />
        </Button>
      )}
    </div>
  );
};

export { ScrollToUpArrow };
