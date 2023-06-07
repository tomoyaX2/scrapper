import React, { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import type { ImageProps } from './props';
import { handleImageOrientation } from '@shared/utils/albumOrientation';
import { useOnScreen } from '@routes/album/reader/utils';

const Image = ({
  url,
  width,
  height,
  horizontalSizes,
  verticalSizes,
  alt = 'preview',
  className,
  previewOrientation,
  allowIntersection,
  activeUrl
}: ImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (allowIntersection) {
      if (activeUrl === url) {
        setTimeout(() => {
          const top = ref?.current?.getBoundingClientRect()?.y;
          if ((top || 0) > 1000) {
            window.scrollTo({ top });
          }
        }, 100);
      }
    }
  }, [activeUrl]);

  useEffect(() => {
    if (allowIntersection && isVisible) {
      const isTheSamepage = localStorage.getItem('saved-page') === url;
      if (!isTheSamepage) {
        localStorage.setItem('saved-page', url ?? '');
      }
    }
  }, [isVisible]);

  const sizes = handleImageOrientation({
    width,
    height,
    horizontalSizes,
    verticalSizes,
    previewOrientation
  });
  return (
    <div ref={ref}>
      <NextImage
        src={url}
        alt={alt}
        loader={({ src, width }) => `${src}?w=${width}`}
        width={sizes.width}
        height={sizes.height}
        placeholder='blur'
        blurDataURL={`${window.location.origin}/images/blur.png`}
        className={className}
      />
    </div>
  );
};

export { Image };
