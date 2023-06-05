import { useState, useMemo, MutableRefObject, useEffect } from 'react';

export const useOnScreen = (ref: MutableRefObject<any>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    observer.observe(ref.current as any);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
