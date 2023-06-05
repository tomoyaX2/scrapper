import { useState, useMemo, useEffect } from 'react';

export const useOnScreen = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    //@ts-expect-error i want
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
