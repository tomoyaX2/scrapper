import Link from 'next/link';
import React from 'react';
import type { AnimeProps } from './animeItem.props';
import { Image } from 'src/components/common/image';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'src/store';
import { EyeIcon } from 'src/components/common/icons/eye';
import { StarIcon } from 'src/components/common/icons/star';
import { resetAnimeState } from 'src/store/anime/list';
import { Button } from 'src/components/common/button';
import { TrashIcon } from 'src/components/common/icons/trash';
import { deleteVideo } from 'src/store/anime/item';

const AnimeItem = ({
  anime: { rate, id, language, title, type, views, coverImageUrl }
}: AnimeProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const { data: user } = useAppSelector(state => state.user);

  React.useEffect(() => {
    () => {
      dispatch(resetAnimeState());
    };
  }, []);

  const onDeleteVideo = () => {
    dispatch(deleteVideo(id));
  };

  const onHover = (status: boolean) => () => {
    setHovered(status);
  };
  const isVisibleControls = user.isAdmin;
  const isInreadableTitle = title?.substring(0, 30).endsWith('(');
  return (
    //div since i should make a column direction
    <div className='flex flex-col mt-4'>
      {isVisibleControls && (
        <div className='bg-primary lg:w-[400px] xsm:w-[300px] mt-12 mx-4 h-7 p-1 '>
          <Button
            className='flex items-center px-2 h-5 float-right justify-center'
            onClick={() => onDeleteVideo()}
          >
            <TrashIcon className='w-6 h-6 mt-1' fill='white' />
            Remove
          </Button>
        </div>
      )}
      <Link href={`/anime/${id}`} passHref>
        <div
          className={`lg:mx-4 md:mx-2 xsm:mx-0 flex flex-col items-center bg-primary cursor-pointer lg:w-[400px] xsm:w-[300px] mb-12 pb-4 ${
            isVisibleControls ? 'pt-0' : 'mt-12 pt-4'
          }`}
          key={id}
          onMouseOver={onHover(true)}
          onMouseLeave={onHover(false)}
        >
          <Image
            url={coverImageUrl ?? ''}
            alt='preview'
            width={300}
            height={300}
          />

          <div className='flex items-center justify-start w-full mt-1 px-4'>
            <div className='flex items-center justify-center'>
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

export { AnimeItem };
