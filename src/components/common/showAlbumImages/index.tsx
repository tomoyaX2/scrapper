import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAppDispatch } from 'src/store';
import { Image as ImageType } from 'src/store/reader/types';
import { Image } from '../image';
import { changeReaderPage } from 'src/store/reader';
import { ShowMoreButton } from '../ShowHideButton';

export const ShowAlbumImages = ({
  items,
  albumId
}: {
  items: ImageType[];
  albumId: string;
}) => {
  const dispatch = useAppDispatch();
  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
  const itemsToRender = useMemo(
    () => (showMoreItems ? items : items.slice(0, 10)),
    [showMoreItems, items]
  );
  return (
    <div className='flex flex-col items-center justify-center bg-secondary mt-4'>
      <div className='flex flex-row flex-wrap items-center max-w-gallery justify-center'>
        {itemsToRender.map((el, index) =>
          el ? (
            <Link href={`/album/${albumId}/reader`} passHref key={el.id}>
              <div
                className='px-4 py-2 cursor-pointer'
                onClick={() => dispatch(changeReaderPage(index))}
              >
                <Image
                  url={el?.url}
                  width={el.width}
                  height={el.height}
                  alt={`image-${el.id}`}
                  horizontalSizes={{ height: 200, width: 450 }}
                  verticalSizes={{ height: 300, width: 200 }}
                  className='px-4 py-2'
                />
              </div>
            </Link>
          ) : null
        )}
      </div>
      <div className='p-4'>
        <ShowMoreButton
          action={() => setShowMoreItems(!showMoreItems)}
          active={showMoreItems}
          isVisible={items.length > 10}
          className='text-base'
        />
      </div>
    </div>
  );
};
