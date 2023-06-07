import Link from 'next/link';
import React from 'react';
import type { AnimeProps } from './animeItem.props';
import { Image } from 'src/components/common/image';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { EyeIcon } from 'src/components/common/icons/eye';
import { StarIcon } from 'src/components/common/icons/star';
import { resetAnimeState } from 'src/store/anime/list';

const AnimeItem = ({
  anime: { rate, id, language, title, type, views, coverImageUrl }
}: AnimeProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    () => {
      dispatch(resetAnimeState());
    };
  }, []);

  const onHover = (status: boolean) => () => {
    setHovered(status);
  };

  const isInreadableTitle = title?.substring(0, 30).endsWith('(');
  return (
    //div since i should make a column direction
    <div className='flex flex-col mt-4'>
      <Link href={`/anime/${id}`} passHref>
        <div
          className='mx-4 flex flex-col items-center bg-primary cursor-pointer w-80 mb-12 pb-4'
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

export { AnimeItem };
