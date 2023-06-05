import Link from 'next/link';
import React from 'react';
import { cdnUrl } from '@shared/api';
import { ImageIcon } from 'src/components/common/icons/image';
import { resetAlbumState } from 'src/store/albums';
import { Image } from 'src/components/common/image';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'src/store';
import { EyeIcon } from 'src/components/common/icons/eye';
import { StarIcon } from 'src/components/common/icons/star';
import { Album as AlbumType } from 'src/store/albums/types';

const Album = ({
  album: {
    rate,
    id,
    language,
    title,
    type,
    preview,
    totalImages,
    views,
    path,
    previewOrientation
  }
}: {
  album: AlbumType;
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: user } = useAppSelector(state => state.user);
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
  const isInreadableTitle = title?.substring(0, 30).endsWith('(');
  return (
    //div since i should make a column direction
    <div className='flex flex-col'>
      <Link href={`/album/${id}`} passHref target='_blank'>
        <div
          className='mx-4 flex flex-col items-center bg-primary cursor-pointer w-80 mb-12 pb-4'
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

            <div className='flex items-center justify-center ml-3'>
              <StarIcon className='w-4 h-4 mr-2' fill='#ffb400' />

              <span>{rate ?? 0}</span>
            </div>

            {user.isAdmin && (
              <div className='flex items-center justify-center ml-3'>
                <EyeIcon className='w-4 h-4 mr-2' fill='white' />

                <span>{views ?? 0}</span>
              </div>
            )}
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

                {`  ${
                  isHovered
                    ? title
                    : isInreadableTitle
                    ? title?.substring(0, 50)
                    : title?.substring(0, 30)
                } `}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { Album };
