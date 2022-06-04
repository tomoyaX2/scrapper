import Image from 'next/image';
import React from 'react';
import type { AlbumProps } from './album.props';

const Album = ({
  album: { id, language, name, type, images }
}: AlbumProps): JSX.Element => {
  const [isHovered, setHovered] = React.useState<boolean>(false);

  const onHover = (status: boolean) => () => {
    setHovered(status);
  };

  return (
    <div
      className='mx-4 flex flex-col items-center bg-primary cursor-pointer w-80 my-8'
      key={id}
      onMouseOver={onHover(true)}
      onMouseLeave={onHover(false)}
    >
      <Image
        src={images[0].url}
        loader={({ src, width }) => `${src}?w=${width}`}
        alt='preview'
        width={300}
        height={300}
      />

      <div className='z-50'>
        <div className='absolute -ml-40 w-80 bg-primary flex flex-col'>
          <span className='text-sm text-title text-left py-2 px-4'>
            {`${language?.name ? `[${language.name}]` : ''}  [${type.name}]`}

            {`  ${isHovered ? name : name.substring(0, 50)} `}
          </span>

          {isHovered && (
            <span className='w-full text-xs w-full pl-4 py-2'>
              Total Images: {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export { Album };
