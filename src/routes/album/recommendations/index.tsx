import { Album } from './album.component';
import { useState } from 'react';
import { Arrow } from 'src/components/common/icons/arrow';
import { Album as AlbumType } from 'src/store/albums/types';

const Recommendations = ({
  items,
  label
}: {
  items: AlbumType[];
  label: string;
}) => {
  const [isExpanded, setExpanded] = useState(true);

  const changeExpandState = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className='ml-4 flex flex-col w-80 xl:block xsm:hidden mr-4 mt-4'>
      <div
        className='flex flex-row items-center justify-start h-12 w-full bg-secondary px-4 cursor-pointer'
        onClick={changeExpandState}
      >
        <Arrow
          fill='white'
          className={`${isExpanded ? 'rotate-90' : '-rotate-90'}`}
        />
        <span className='ml-4 text-md font-semibold'>{label}</span>
      </div>
      {isExpanded && (
        <div className='flex flex-col items-center justify-start w-full text-white-300'>
          {items?.map(el => (
            <div
              className='flex flex-col items-center justify-start px-4 w-full mt-4 rounded'
              key={el.id}
            >
              <Album album={el} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Recommendations };
