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
    <div className='fixed right-40 bottom-20'>
      {showScrollArrow && (
        <Button onClick={handleScrollToUp}>
          <ArrowTop />
        </Button>
      )}
    </div>
  );
};

export { ScrollToUpArrow };
