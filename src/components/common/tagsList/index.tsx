import Link from 'next/link';
import { useMemo, useState } from 'react';
import { TagsListProps } from './types';
import { Tag } from 'rsuite';
import { ShowMoreButton } from '../ShowHideButton';

export const TagsList = ({ items }: TagsListProps) => {
  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
  const itemsToRender = useMemo(
    () => (showMoreItems ? items : items.slice(0, 10)),
    [showMoreItems, items]
  );

  return (
    <div className='flex items-center flex-wrap max-w-tags'>
      {itemsToRender.map(el => (
        <Link href={`/?page=1&tags=${el.id}`} passHref key={el.id}>
          <a target='_blank'>
            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
              {el.name}
            </Tag>
          </a>
        </Link>
      ))}

      <ShowMoreButton
        isVisible={items.length > 10}
        action={setShowMoreItems}
        active={showMoreItems}
      />
    </div>
  );
};
