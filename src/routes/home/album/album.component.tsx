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
import { AppDispatch, useAppSelector } from 'src/store';
import { EyeIcon } from 'src/components/common/icons/eye';
import { removeFromGallery } from 'src/store/galleries';
import { Button } from 'rsuite';
import { TrashIcon } from 'src/components/common/icons/trash';
import { StarIcon } from 'src/components/common/icons/star';
import { deleteAlbum } from 'src/store/album';

const Album = ({
  album: { rate, id, language, title, type, preview, totalImages, views, path },
  galleryId,
  isHome
}: AlbumProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const [imagePath, setImagePath] = React.useState(
    preview ? preview : `${cdnUrl}/images-new/${path?.split('/')[1]}/10001.webp`
  );
  const { data: user } = useAppSelector(state => state.user);

  React.useEffect(() => {
    () => {
      dispatch(resetAlbumState());
    };
  }, []);

  const onRemoveFromGallery = (albumId: string, galleryId = '') => {
    dispatch(removeFromGallery({ albumId, galleryId }));
  };

  const onDeleteFromHome = () => {
    dispatch(deleteAlbum(id));
  };

  const onHover = (status: boolean) => () => {
    setHovered(status);
  };

  const onImageError = () =>
    setImagePath(`${cdnUrl}/images-new/${path.split('/')[1]}/10002.webp`);
  const isInreadableTitle = title?.substring(0, 30).endsWith('(');
  const isVisibleControls = galleryId || (isHome && user.isAdmin);
  return (
    //div since i should make a column direction
    <div className='flex flex-col'>
      {isVisibleControls && (
        <div className='bg-primary lg:w-[400px] xsm:w-[300px] mt-12 mx-4 h-7 p-1 '>
          <Button
            className='flex items-center px-2 h-5 float-right justify-center items-center'
            onClick={
              isHome
                ? () => onDeleteFromHome()
                : () => onRemoveFromGallery(id, galleryId)
            }
          >
            <TrashIcon className='w-6 h-6 mt-1' fill='white' />
            Remove
          </Button>
        </div>
      )}
      <Link href={`/album/${id}`} passHref target='_blank'>
        <div
          className={`lg:mx-4 md:mx-2 xsm:mx-0 flex flex-col items-center bg-primary cursor-pointer lg:w-[400px] xsm:w-[300px] mb-12 pb-4 ${
            isVisibleControls ? 'pt-0' : 'mt-12 pt-4'
          }`}
          key={id}
          onMouseOver={onHover(true)}
          onMouseLeave={onHover(false)}
        >
          <Image
            url={imagePath}
            onError={onImageError}
            alt='preview'
            width={400}
            height={400}
            className='h-[300px]'
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

            <div className='flex items-center justify-center ml-3'>
              <EyeIcon className='w-4 h-4 mr-2' fill='white' />

              <span>{views ?? 0}</span>
            </div>
          </div>

          <div className={isHovered ? 'z-50' : ''}>
            <div
              className={`absolute lg:-ml-[200px] xsm:-ml-[150px] lg:w-[400px] xsm:w-[300px] bg-primary flex flex-col ${
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
