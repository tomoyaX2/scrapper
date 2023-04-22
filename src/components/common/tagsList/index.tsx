import Link from 'next/link';
import { FC, useCallback, useMemo, useState } from 'react';
import { TagsListProps } from './tagsList.props';
import { Button, Tag } from 'rsuite';

export const TagsList: FC<TagsListProps> = ({ tags }) => {
  const [showMoreTags, setShowMoreTags] = useState<boolean>(false);
  const tagsToRender = useMemo(
    () => (showMoreTags ? tags : tags.slice(0, 10)),
    [showMoreTags, tags]
  );
  const handleShowMoreTags = useCallback(() => {
    setShowMoreTags(ShowMoreTags => !ShowMoreTags);
  }, []);

  return (
    <div className='flex items-center flex-wrap max-w-tags'>
      {tagsToRender.map(el => (
        <Link href={`/?page=1&tags=${el.id}`} passHref key={el.id}>
          <a target='_blank'>
            <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
              {el.name}
            </Tag>
          </a>
        </Link>
      ))}

      {tags.length > 10 && (
        <Button className='rs-tag-md' onClick={handleShowMoreTags}>
          {showMoreTags ? 'Hide' : 'Show'}
        </Button>
      )}
    </div>
  );
};
