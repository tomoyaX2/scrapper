import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TagPicker } from 'rsuite';
import { Input } from 'rsuite';
import {
  $albumsState,
  $search,
  changePageOptionsFx,
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
  buildPaginationString,
  buildSearchState,
  paginationChangeFactory
} from '@shared/utils/pagination';
import { searchBar } from './search-bar.model';

const props = {
  tags: $tags,
  types: $types,
  languages: $languages,
  series: $series,
  authors: $authors,
  groups: $groups,
  albums: $albumsState,
  handleSearch: searchAlbumsFx,
  setSearch: changeSearchStateFx,
  changePage: changePageOptionsFx,
  search: $search
};

let searchTimeout = setTimeout(() => {}, 0);

export const SearchBar = createView()
  .props(props)
  .enter(searchBar.enter)
  .view(
    ({
      tags: { tagsList },
      types: { typesList },
      languages: { languagesList },
      series: { seriesList },
      authors: { authorsList },
      groups: { groupsList },
      albums: { page, perPage },
      handleSearch,
      changePage,
      setSearch,
      search
    }) => {
      const router = useRouter();
      const [isExpanded, setExpanded] = useState(false);
      const onSetExpanded = () => setExpanded(!isExpanded);
      const { tags, types, languages, series, authors, groups, name } = search;

      useEffect(() => {
        if (router.query) {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            handleSearch({
              ...search,
              page: parseInt(router.query.page as string),
              perPage
            });
          }, 1000);
        }
      }, [router.query]);

      useEffect(() => {
        if (!router.query?.page) {
          router.replace(`/${buildPaginationString({ ...search, page: 1 })}`);
        }

        const initialSearch = buildSearchState(router, perPage, changePage);
        setSearch(initialSearch);
      }, [router.query]);

      const onSetName = (name: string) => {
        setSearch({ ...search, name });
      };

      const onPaginationChangeFactory = paginationChangeFactory(router, {
        ...search,
        page
      });

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
            </div>

            {isExpanded && (
              <div className='flex w-full mt-4 justify-center items-center'>
                <Input
                  placeholder='Title name...'
                  className='!w-40 mr-4 my-2 rs-theme-dark'
                  value={name ?? ''}
                  onChange={onSetName}
                />

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
              </div>
            )}

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
