import Image from 'next/image';
import React from 'react';
import type { AlbumProps } from './album.props';

const Album = ({
  album: { id, language, name, type, images }
}: AlbumProps): JSX.Element => (
  <div
    className='m-4 flex flex-col items-center bg-primary cursor-pointer w-80'
    key={id}
  >
    <Image
      src={images[0].url}
      loader={({ src, width }) => `${src}?w=${width}`}
      alt='preview'
      width={300}
      height={300}
    />

    <span className='text-sm text-title text-center py-1 px-1'>
      {`${language?.name ? `[${language.name}]` : ''} ${name} [${type.name}]`}
    </span>
  </div>
);

export { Album };
