import { MutableRefObject, useRef } from 'react';
import { Image } from 'src/components/common/image';
import { Button } from '../button';
import { Arrow } from '../icons/arrowRight';
import { HorisontalScrollSelectorProps } from './types';

export const HorisontalScrollSelector = ({
  name,
  data,
  activeEpisode,
  callback
}: HorisontalScrollSelectorProps): JSX.Element => {
  const selectorRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleClick = (id: string) => {
    // Invoke the callback function passed from the parent component
    callback ? callback(id) : null;
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
            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
            .map(episode => (
              <Button
                key={episode.id}
                className={`mx-1 hover:bg-secondary ${
                  activeEpisode?.id === episode.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleClick(episode.id)}
              >
                <Image url='' alt='episode preview' width={150} height={170} />
                <div>{episode.name}</div>
              </Button>
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
