import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TagPicker, SelectPicker } from 'rsuite';
import {
  $albumsState,
  $search,
  changeSearchStateFx,
  searchAlbumsFx
} from '@entities/album';
import type { Search } from '@entities/album';
import {
  $authors,
  onSearchAuthorFx,
  incrementAuthorsPageFx,
  resetAuthorsPageFx,
  decrementAuthorsPageFx
} from '@entities/author';
import {
  $groups,
  incrementGroupsFx,
  resetGroupsFx,
  onSearchGroupsFx
} from '@entities/groups';
import { $languages } from '@entities/language';
import {
  $series,
  incrementSeriesPageFx,
  resetSeriesPageFx,
  onSearchSeriesFx
} from '@entities/series';
import {
  $tags,
  incrementPageFx,
  onSearchTagFx,
  resetTagPageFx
} from '@entities/tag';
import { $types } from '@entities/type';
import { createView } from '@shared/lib/view';
import { Arrow } from '@shared/ui/atoms/icons/arrow';
import {
  buildSearchState,
  paginationChangeFactory,
  searchInputOptionsFactory
} from '@shared/utils/pagination';
import { useMultiselectUpdateItemsInScroll } from '@shared/utils/selectScrollLoadItems';

import { searchTimeoutHandler } from '@shared/utils/timeoutHandler';

const selectData = [
  { label: 'Rate', value: 'rate' },
  { label: 'Views', value: 'views' },
  { label: 'Total Images', value: 'totalImages' }
];

const props = {
  tags: $tags,
  types: $types,
  languages: $languages,
  series: $series,
  authors: $authors,
  groups: $groups,
  albums: $albumsState,
  handleSearch: searchAlbumsFx,
  search: $search,
  setSearch: changeSearchStateFx,
  incrementTagPage: incrementPageFx,
  onSearchTag: onSearchTagFx,
  onSearchAuthor: onSearchAuthorFx,
  incrementAuthorsPage: incrementAuthorsPageFx,
  resetTagPage: resetTagPageFx,
  resetAuthorsPage: resetAuthorsPageFx,
  incrementSeriesPage: incrementSeriesPageFx,
  resetSeriesPage: resetSeriesPageFx,
  onSearchSeries: onSearchSeriesFx,
  incrementGroups: incrementGroupsFx,
  resetGroups: resetGroupsFx,
  onSearchGroups: onSearchGroupsFx,
  decrementAuthorsPage: decrementAuthorsPageFx
};

export const SearchBar = createView()
  .props(props)
  .view(
    ({
      tags: { visibleTags, tagsList },
      types: { typesList },
      languages: { languagesList },
      series: { seriesList, visibleSeries },
      authors: { authorsList, visibleAuthors, page: authorsPage },
      groups: { groupsList, visibleGroups },
      handleSearch,
      setSearch,
      search,
      incrementTagPage,
      onSearchTag,
      onSearchAuthor,
      incrementAuthorsPage,
      resetTagPage,
      resetAuthorsPage,
      incrementSeriesPage,
      resetSeriesPage,
      onSearchSeries,
      incrementGroups,
      resetGroups,
      onSearchGroups,
      decrementAuthorsPage
    }) => {
      const router = useRouter();
      const [isExpanded, setExpanded] = useState(false);
      const onSetExpanded = () => setExpanded(!isExpanded);
      const { tags, types, languages, series, authors, groups } = search;
      const tagScrollMultiselectProps = useMultiselectUpdateItemsInScroll({
        increment: incrementTagPage,
        resetPage: resetTagPage
      });
      const authorScrollMultiselectProps = useMultiselectUpdateItemsInScroll({
        increment: incrementAuthorsPage,
        decrement: decrementAuthorsPage,
        resetPage: resetAuthorsPage
      });
      const seriesScrollMultiselectProps = useMultiselectUpdateItemsInScroll({
        increment: incrementSeriesPage,
        decrement: resetSeriesPage
      });
      const groupsScrollMultiselectProps = useMultiselectUpdateItemsInScroll({
        increment: incrementGroups,
        resetPage: resetGroups
      });

      useEffect(() => {
        const searchData = buildSearchState(router, search.perPage);
        setSearch(
          search.shouldResetPage
            ? { ...searchData, page: 1, shouldResetPage: false }
            : searchData
        );

        searchTimeoutHandler(handleSearch as (data: Search) => void)(
          search.shouldResetPage
            ? { ...searchData, page: 1, shouldResetPage: false }
            : searchData
        );
      }, [router.query]);

      const onPaginationChangeFactory = paginationChangeFactory(
        router,
        setSearch,
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
                onSearch={onSearchTag}
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
                  onSearch={onSearchSeries}
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
                  onSearch={onSearchAuthor}
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
                  onSearch={onSearchGroups}
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
    }
  );
