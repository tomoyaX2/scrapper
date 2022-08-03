import React from 'react';
import NextImage from 'next/image';
import type { ImageProps } from './props';
import { handleImageOrientation } from '@shared/utils/albumOrientation';

const Image = ({
  url,
  width,
  height,
  horizontalSizes,
  verticalSizes,
  alt = 'preview',
  className,
  previewOrientation
}: ImageProps) => {
  const sizes = handleImageOrientation({
    width,
    height,
    horizontalSizes,
    verticalSizes,
    previewOrientation
  });
  return (
    <NextImage
      src={url}
      loader={({ src, width }) => `${src}?w=${width}`}
      alt={alt}
      width={sizes.width}
      height={sizes.height}
      placeholder='blur'
      blurDataURL={`${window.location.host}/images/blur.png`}
      className={className}
    />
  );
};

export { Image };
