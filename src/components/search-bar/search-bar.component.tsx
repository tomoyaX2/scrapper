import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TagPicker, SelectPicker } from 'rsuite';
import { Arrow } from 'src/components/icons/arrow';
import {
  buildSearchState,
  paginationChangeFactory,
  searchInputOptionsFactory
} from '@shared/utils/pagination';
import { useMultiselectScrollPropsFactory } from '@shared/utils/selectScrollLoadItems';
import { useAppDispatch, useAppSelector } from 'src/store';
import { optionsSelector } from './selectors';
import { searchTimeoutHandler } from '@shared/utils/timeoutHandler';
import { changeSearchState, getAlbums } from 'src/store/albums';
import { onSearchTags } from 'src/store/tags';
import { onSearchSeries } from 'src/store/series';
import { onSearchAuthor } from 'src/store/authors';
import { onSearchGroup } from 'src/store/groups';

const selectData = [
  { label: 'Rate', value: 'rate' },
  { label: 'Views', value: 'views' },
  { label: 'Total Images', value: 'totalImages' }
];

export const SearchBar = (): JSX.Element => {
  const {
    tagsSelector,
    typesSelector,
    languagesSelector,
    seriesSelector,
    authorsSelector,
    groupsSelector,
    albumsSelector
  } = useAppSelector(optionsSelector);
  const { visibleTags, tagsList } = tagsSelector;
  const { typesList } = typesSelector;
  const { languagesList } = languagesSelector;
  const { seriesList, visibleSeries } = seriesSelector;
  const { authorsList, visibleAuthors } = authorsSelector;
  const { groupsList, visibleGroups } = groupsSelector;
  const { search } = albumsSelector;

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const onSetExpanded = () => setExpanded(!isExpanded);
  const { tags, types, languages, series, authors, groups } = search;

  const {
    groupsScrollMultiselectProps,
    seriesScrollMultiselectProps,
    authorScrollMultiselectProps,
    tagScrollMultiselectProps
  } = useMultiselectScrollPropsFactory(dispatch);

  useEffect(() => {
    const searchData = buildSearchState(router, search.perPage);
    dispatch(
      changeSearchState(
        search.shouldResetPage
          ? { ...searchData, page: 1, shouldResetPage: false }
          : searchData
      )
    );
    const callback = () => {
      dispatch(
        getAlbums(
          search.shouldResetPage
            ? { ...searchData, page: 1, shouldResetPage: false }
            : searchData
        )
      );
    };
    searchTimeoutHandler(callback);
  }, [router.query]);

  const onPaginationChangeFactory = paginationChangeFactory(
    router,
    data => dispatch(changeSearchState(data)),
    search
  );

  return (
    <div className='flex flex-col items-center w-full py-4 flex-wrap px-8'>
      <div className='flex lg:flex-row md:flex-col sm:flex-col xsm:flex-col md:items-center sm:items-start xsm:items-start w-full flex-wrap'>
        <div className='flex flex-row flex-wrap w-full justify-center items-center'>
          <TagPicker
            data={searchInputOptionsFactory(visibleTags, tagsList, tags)}
            className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Tags...'
            value={tags ?? []}
            onSearch={(value: string) => dispatch(onSearchTags(value))}
            onChange={onPaginationChangeFactory('tags')}
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
            {...tagScrollMultiselectProps}
          />

          <TagPicker
            data={typesList}
            className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Types...'
            value={types ?? []}
            onChange={onPaginationChangeFactory('types')}
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
          />

          <TagPicker
            data={languagesList}
            className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Languages...'
            onChange={onPaginationChangeFactory('languages')}
            value={languages ?? []}
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
          />

          <SelectPicker
            data={selectData}
            className='rs-theme-dark w-40 mr-4 my-2 min-w-searchInput'
            menuClassName='rs-theme-dark'
            searchable={false}
            placeholder='Sort by...'
            onChange={onPaginationChangeFactory('sortBy')}
          />
        </div>

        <div className='flex lg:flex-row md:flex-row sm:flex-col xsm:flex-col w-full lg:mt-4 md:mt-4 sm:mt-0 xsm:mt-0 justify-center items-center mr-28'>
          {(isExpanded || !!series?.length) && (
            <TagPicker
              data={searchInputOptionsFactory(
                visibleSeries,
                seriesList,
                series
              )}
              className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
              menuClassName='rs-theme-dark'
              placeholder='Series...'
              value={series ?? []}
              onChange={onPaginationChangeFactory('series')}
              onSearch={(value: string) => dispatch(onSearchSeries(value))}
              searchable
              renderMenuItem={label => (
                <span className='font-normal text-base'>{label}</span>
              )}
              {...seriesScrollMultiselectProps}
            />
          )}

          {(isExpanded || !!authors?.length) && (
            <TagPicker
              data={searchInputOptionsFactory(
                visibleAuthors,
                authorsList,
                authors
              )}
              className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
              menuClassName='rs-theme-dark'
              placeholder='Authors...'
              value={authors ?? []}
              onSearch={(value: string) => dispatch(onSearchAuthor(value))}
              onChange={onPaginationChangeFactory('authors')}
              searchable
              renderMenuItem={label => (
                <span className='font-normal text-base'>{label}</span>
              )}
              {...authorScrollMultiselectProps}
            />
          )}

          {(isExpanded || !!groups?.length) && (
            <TagPicker
              data={searchInputOptionsFactory(
                visibleGroups,
                groupsList,
                groups
              )}
              className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
              menuClassName='rs-theme-dark'
              placeholder='Groups...'
              onChange={onPaginationChangeFactory('groups')}
              value={groups ?? []}
              onSearch={(value: string) => dispatch(onSearchGroup(value))}
              searchable
              renderMenuItem={label => (
                <span className='font-normal text-base'>{label}</span>
              )}
              {...groupsScrollMultiselectProps}
            />
          )}
        </div>

        <div className='flex flex-row items-center justify-center w-full mt-4'>
          <div className='flex flex-row items-center justify-center'>
            <span
              className='text-xs mr-4 underline  cursor-pointer'
              onClick={onSetExpanded}
            >
              {isExpanded ? 'Collapse' : 'Advanced Search'}
            </span>

            <Arrow
              className={`${
                isExpanded ? '-rotate-90' : 'rotate-90'
              }  cursor-pointer`}
              fill='white'
              width='12px'
              height='12px'
              onClick={onSetExpanded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
