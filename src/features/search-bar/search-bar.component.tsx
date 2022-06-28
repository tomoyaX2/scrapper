import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, TagPicker } from 'rsuite';
import {
  $albumsState,
  $search,
  changeSearchStateFx,
  searchAlbumsFx
} from '@entities/album';
import { $authors } from '@entities/author';
import { $groups } from '@entities/groups';
import { $languages } from '@entities/language';
import { $series } from '@entities/series';
import { $tags } from '@entities/tag';
import { $types } from '@entities/type';
import { createView } from '@shared/lib/view';
import { Arrow } from '@shared/ui/atoms/icons/arrow';
import {
  buildSearchState,
  paginationChangeFactory
} from '@shared/utils/pagination';
import { buildPaginationString } from '@shared/utils/pagination';

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
  setSearch: changeSearchStateFx
};

export const SearchBar = createView()
  .props(props)
  .view(
    ({
      tags: { tagsList },
      types: { typesList },
      languages: { languagesList },
      series: { seriesList },
      authors: { authorsList },
      groups: { groupsList },
      handleSearch,
      setSearch,
      search
    }) => {
      const router = useRouter();
      const [isExpanded, setExpanded] = useState(false);
      const onSetExpanded = () => setExpanded(!isExpanded);
      const { tags, types, languages, series, authors, groups } = search;

      useEffect(() => {
        const initialSearch = buildSearchState(router, search.perPage);
        setSearch(initialSearch);
        handleSearch(initialSearch);
      }, []);

      const onPaginationChangeFactory = paginationChangeFactory(
        router,
        setSearch,
        search
      );

      const onSearch = () => {
        setSearch({ ...search, page: 1, perPage: 20 });
        router.replace(
          `/${buildPaginationString({ ...search, page: 1, perPage: 20 })}`
        );
        handleSearch({ ...search, page: 1, perPage: 20 });
      };

      return (
        <div className='flex flex-col items-center w-full py-4 flex-wrap px-8'>
          <div className='flex lg:flex-row md:flex-col sm:flex-col xsm:flex-col items-center w-full flex-wrap'>
            <div className='flex flex-row flex-wrap w-full justify-center items-center'>
              <TagPicker
                data={tagsList}
                className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                menuClassName='rs-theme-dark'
                placeholder='Tags...'
                value={tags ?? []}
                onChange={onPaginationChangeFactory('tags')}
                searchable
                renderMenuItem={label => (
                  <span className='font-normal text-base'>{label}</span>
                )}
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

              <Button
                className='bg-secondary rs-theme-dark hover:bg-black-400 px-4 py-2 rounded-md w-28'
                onClick={onSearch}
              >
                Search
              </Button>
            </div>

            <div className='flex w-full mt-4 justify-center items-center'>
              {(isExpanded || !!series?.length) && (
                <TagPicker
                  data={seriesList}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Series...'
                  value={series ?? []}
                  onChange={onPaginationChangeFactory('series')}
                  searchable
                  renderMenuItem={label => (
                    <span className='font-normal text-base'>{label}</span>
                  )}
                />
              )}

              {(isExpanded || !!authors?.length) && (
                <TagPicker
                  data={authorsList}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Authors...'
                  value={authors ?? []}
                  onChange={onPaginationChangeFactory('authors')}
                  searchable
                  renderMenuItem={label => (
                    <span className='font-normal text-base'>{label}</span>
                  )}
                />
              )}

              {(isExpanded || !!groups?.length) && (
                <TagPicker
                  data={groupsList}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Groups...'
                  onChange={onPaginationChangeFactory('groups')}
                  value={groups ?? []}
                  searchable
                  renderMenuItem={label => (
                    <span className='font-normal text-base'>{label}</span>
                  )}
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
