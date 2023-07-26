import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { TagsListProps } from './types';
import { Button, Tag, TagPicker } from 'rsuite';
import { ShowMoreButton } from '../ShowHideButton';
import { searchInputOptionsFactory } from '@shared/utils/pagination';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useMultiselectScrollPropsFactory } from '@shared/utils/selectScrollLoadItems';
import { optionsAnimeSelector } from 'src/components/search-anime-bar/selectors';
import { getVideoTags } from 'src/store/anime/tags';

export const TagsList = ({
  items,
  allowRedirect,
  redactorMode
}: TagsListProps) => {
  const dispatch = useAppDispatch();
  const { tagsSelector } = useAppSelector(optionsAnimeSelector);
  const { visibleTags, tagsList } = tagsSelector;
  const [tagsToAdd, setTagsToAdd] = useState<string[]>([]);

  const { tagScrollMultiselectProps } =
    useMultiselectScrollPropsFactory(dispatch);

  useEffect(() => {
    dispatch(getVideoTags());
  }, []);

  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
  const itemsToRender = useMemo(
    () => (showMoreItems ? items : items.slice(0, 10)),
    [showMoreItems, items]
  );
  const onAddTags = () => {
    console.log(tagsToAdd);
    setTagsToAdd([]);
  };
  const onDeleteTag = (name: string) => {
    console.log(name);
  };

  return (
    <div className='flex items-center flex-wrap max-w-tags'>
      {itemsToRender.map(el =>
        allowRedirect ? (
          redactorMode ? (
            <Link
              href={`/?page=1&tags=${el.id}`}
              passHref
              key={el.id}
              target='_blank'
            >
              <Tag
                className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '
                closable
                onClose={() => onDeleteTag(el.id)}
              >
                {el.name}
                <span className='ml-1'>
                  | {el.albumsCount ?? el.videosCount}
                </span>
              </Tag>
            </Link>
          ) : (
            <Link
              href={`/?page=1&tags=${el.id}`}
              passHref
              key={el.id}
              target='_blank'
            >
              <Tag className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '>
                {el.name}
                <span className='ml-1'>
                  | {el.albumsCount ?? el.videosCount}
                </span>
              </Tag>
            </Link>
          )
        ) : redactorMode ? (
          <Tag
            className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '
            key={el.id}
            closable
            onClose={() => onDeleteTag(el.id)}
          >
            {el.name}
            <span className='ml-1'>| {el.albumsCount ?? el.videosCount}</span>
          </Tag>
        ) : (
          <Tag
            className='cursor-pointer mr-1 bg-third hover:bg-third-hover capitalize !ml-0 my-1 '
            key={el.id}
          >
            {el.name}
            <span className='ml-1'>| {el.albumsCount ?? el.videosCount}</span>
          </Tag>
        )
      )}

      <ShowMoreButton
        isVisible={items.length > 10}
        action={setShowMoreItems}
        active={showMoreItems}
      />
      {redactorMode && (
        <>
          <TagPicker
            data={searchInputOptionsFactory(visibleTags, tagsList)}
            className='min-w-searchInput mr-4 my-2 w-20 '
            menuClassName=''
            placeholder='Add Tag...'
            value={tagsToAdd}
            onChange={(value: string[]) => {
              setTagsToAdd(value);
            }}
            searchable
            renderMenuItem={(label, item) => (
              <span className='font-normal text-base'>
                {label} ({item.count})
              </span>
            )}
            {...tagScrollMultiselectProps}
          />
          <Button onClick={() => onAddTags()}>Add</Button>
        </>
      )}
    </div>
  );
};
