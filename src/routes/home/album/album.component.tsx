import Link from 'next/link';
import React from 'react';
import { cdnUrl } from '@shared/api';
// import { EyeIcon } from '@shared/ui/atoms/icons/eye';
import { ImageIcon } from 'src/components/common/icons/image';
// import { StarIcon } from '@shared/ui/atoms/icons/star';
import type { AlbumProps } from './album.props';
import { resetAlbumState } from 'src/store/albums';
import { Image } from 'src/components/common/image';
import { useDispatch } from 'react-redux';

const Album = ({
  album: {
    id,
    language,
    title,
    type,
    preview,
    totalImages,
    path,
    previewOrientation
  }
}: AlbumProps): JSX.Element => {
  const dispatch = useDispatch();
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const [imagePath, setImagePath] = React.useState(
    preview ? preview : `${cdnUrl}/images-new/${path?.split('/')[1]}/10001.webp`
  );

  React.useEffect(() => {
    () => {
      dispatch(resetAlbumState());
    };
  }, []);

  const onHover = (status: boolean) => () => {
    setHovered(status);
  };

  const onImageError = () =>
    setImagePath(`${cdnUrl}/images-new/${path.split('/')[1]}/10002.webp`);

  return (
    <Link href={`/album/${id}`} passHref>
      <a target='_blank'>
        <div
          className='mx-4 flex flex-col items-center bg-primary cursor-pointer w-80 my-12 py-4'
          key={id}
          onMouseOver={onHover(true)}
          onMouseLeave={onHover(false)}
        >
          <Image
            url={imagePath}
            onError={onImageError}
            previewOrientation={previewOrientation}
            alt='preview'
            width={0}
            height={0}
            horizontalSizes={{ height: 200, width: 300 }}
            verticalSizes={{ height: 300, width: 300 }}
          />

          <div className='flex items-center justify-start w-full mt-1 px-4'>
            <div className='flex items-center justify-center'>
              <ImageIcon className='w-4 h-4 mr-2' fill='white' />

              <span>{totalImages}</span>
            </div>

            {/* <div className='flex items-center justify-center ml-3'>
            <StarIcon className='w-4 h-4 mr-2' fill='#ffb400' />

            <span>{0}</span>
          </div> */}

            {/* <div className='flex items-center justify-center ml-3'>
              <EyeIcon className='w-4 h-4 mr-2' fill='white' />

              <span>{views ?? 0}</span>
            </div> */}
          </div>

          <div className={isHovered ? 'z-50' : ''}>
            <div
              className={`absolute -ml-40 w-80 bg-primary flex flex-col ${
                isHovered && title?.length > 30 ? 'h-24' : 'h-16'
              }`}
            >
              <h2 className='text-sm text-title text-left py-1 px-4'>
                {`${language?.name ? `[${language.name}]` : ''}  ${
                  type?.name ? `[${type.name}]` : ''
                }`}

                {`  ${isHovered ? title : title?.substring(0, 30)} `}
              </h2>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export { Album };
