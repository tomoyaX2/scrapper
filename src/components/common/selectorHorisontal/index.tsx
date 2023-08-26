import { MutableRefObject, useRef } from 'react';
import { Image } from 'src/components/common/image';
import { useAppDispatch, useAppSelector } from 'src/store';
import { deleteEpisode } from 'src/store/anime/item';
import { Button } from '../button';
import { Arrow } from '../icons/arrowRight';
import { TrashIcon } from '../icons/trash';
import { HorisontalScrollSelectorProps } from './types';

export const HorisontalScrollSelector = ({
  name,
  data,
  activeEpisode,
  callback
}: HorisontalScrollSelectorProps): JSX.Element => {
  const selectorRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { data: user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    // Invoke the callback function passed from the parent component
    callback ? callback(id) : null;
  };

  const onDeleteEpisode = (episodeId: string) => {
    dispatch(deleteEpisode(episodeId));
  };

  const scrollLeft = () => {
    selectorRef.current.scrollLeft -= 300;
  };
  const scrollRight = () => {
    selectorRef.current.scrollLeft += 300;
  };

  return (
    <div className=' lg:w-[75rem] xsm:w-[22rem] border-primary border-4'>
      <div className='flex bg-primary p-2 text-lg'>{name}</div>
      <div className='flex flex-row  py-1 '>
        <Button
          className='flex items-center justify-center w-8 hover:bg-secondary'
          onClick={scrollLeft}
        >
          <Arrow className='rotate-180 cursor-pointer' fill='white' />
        </Button>
        <div
          className='flex flex-row flex-grow overflow-hidden scroll-smooth'
          ref={selectorRef}
        >
          {data
            // .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
            .map(episode => (
              <div key={episode.id} className='mx-1'>
                {user.isAdmin && (
                  <div className='bg-primary lg:w-[150px] xsm:w-[170px] h-6 p-1 '>
                    <Button
                      className='flex items-center px-2 h-5 float-right justify-center text-sm'
                      onClick={() => onDeleteEpisode(episode.id)}
                    >
                      <TrashIcon className='w-5 h-5 mt-1' fill='white' />
                      Remove
                    </Button>
                  </div>
                )}
                <Button
                  className={` hover:bg-secondary ${
                    activeEpisode?.id === episode.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => handleClick(episode.id)}
                >
                  <Image
                    url={episode.coverUrl ?? ''}
                    alt='episode preview'
                    width={150}
                    height={170}
                  />
                  <div>{episode.name}</div>
                </Button>
              </div>
            ))}
        </div>
        <Button
          className='flex items-center justify-center w-8 hover:bg-secondary'
          onClick={scrollRight}
        >
          <Arrow className=' cursor-pointer' fill='white' />
        </Button>
      </div>
    </div>
  );
};
