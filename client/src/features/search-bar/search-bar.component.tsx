import { useState } from 'react';
import { TagPicker, Button } from 'rsuite';
import { Input } from 'rsuite';
import { $albumsState, searchAlbumsFx } from '@entities/album';
import { $authors, changeActiveAuthorFx } from '@entities/author';
import { $groups, changeActiveGroupFx } from '@entities/groups';
import { $languages, changeActiveLanguageFx } from '@entities/language';
import { $series, changeActiveSeriesFx } from '@entities/series';
import { $tags, changeActiveTagFx } from '@entities/tag';
import { $types, changeActiveTypeFx } from '@entities/type';
import { createView } from '@shared/lib/view';
import { Arrow } from '@shared/ui/atoms/icons/arrow';
import { searchBar } from './search-bar.model';

const props = {
  tags: $tags,
  types: $types,
  languages: $languages,
  series: $series,
  authors: $authors,
  groups: $groups,
  albums: $albumsState,
  onChangeActiveTag: changeActiveTagFx,
  onChangeActiveType: changeActiveTypeFx,
  onChangeActiveSeries: changeActiveSeriesFx,
  onChangeActiveLanguage: changeActiveLanguageFx,
  onChangeActiveGroups: changeActiveGroupFx,
  onChangeActiveAuthors: changeActiveAuthorFx,
  handleSearch: searchAlbumsFx
};

export const SearchBar = createView()
  .props(props)
  .enter(searchBar.enter)
  .view(
    ({
      tags: { tags, activeTags },
      types: { types, activeTypes },
      languages: { languages, activeLanguages },
      series: { series, activeSeries },
      authors: { authors, activeAuthors },
      groups: { groups, activeGroups },
      albums: { page, perPage },
      onChangeActiveTag,
      onChangeActiveType,
      onChangeActiveSeries,
      onChangeActiveLanguage,
      onChangeActiveGroups,
      onChangeActiveAuthors,
      handleSearch
    }) => {
      const [isExpanded, setExpanded] = useState(false);
      const [name, onSetName] = useState('');
      const onSetExpanded = () => setExpanded(!isExpanded);

      const onSearch = () => {
        const search = {
          page,
          perPage,
          name
        };
        const optionalSearch = {
          tags: activeTags,
          types: activeTypes,
          languages: activeLanguages,
          series: activeSeries,
          authors: activeAuthors,
          groups: activeGroups
        };

        for (const key of Object.keys(optionalSearch)) {
          if (optionalSearch[key]?.length) {
            search[key] = optionalSearch[key];
          }
        }
        handleSearch(search);
      };

      return (
        <div className='flex flex-col items-center w-full py-4 flex-wrap px-8'>
          <div className='flex lg:flex-row md:flex-col sm:flex-col xsm:flex-col items-center w-full flex-wrap'>
            <div className='flex flex-row flex-wrap w-full justify-center items-center'>
              <TagPicker
                data={tags ?? []}
                className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                menuClassName='rs-theme-dark'
                placeholder='Tags...'
                value={activeTags}
                onChange={onChangeActiveTag}
                searchable
                renderMenuItem={label => (
                  <span className='font-normal text-base'>{label}</span>
                )}
              />

              <TagPicker
                data={types}
                className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                menuClassName='rs-theme-dark'
                placeholder='Types...'
                value={activeTypes}
                onChange={onChangeActiveType}
                searchable
                renderMenuItem={label => (
                  <span className='font-normal text-base'>{label}</span>
                )}
              />

              <TagPicker
                data={languages}
                className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                menuClassName='rs-theme-dark'
                placeholder='Languages...'
                onChange={onChangeActiveLanguage}
                value={activeLanguages}
                searchable
                renderMenuItem={label => (
                  <span className='font-normal text-base'>{label}</span>
                )}
              />

              <Button
                className='bg-black-500 text-white hover:bg-black-100 px-4 py-2 rounded-md w-28 h-9 rs-theme-dark'
                onClick={onSearch}
              >
                Search
              </Button>
            </div>

            {isExpanded && (
              <div className='flex w-full mt-4 justify-center items-center'>
                <Input
                  placeholder='Title name...'
                  className='!w-40 mr-4 my-2 rs-theme-dark'
                  onChange={onSetName}
                />

                <TagPicker
                  data={series}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Series...'
                  value={activeSeries}
                  onChange={onChangeActiveSeries}
                  searchable
                  renderMenuItem={label => (
                    <span className='font-normal text-base'>{label}</span>
                  )}
                />

                <TagPicker
                  data={authors}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Authors...'
                  value={activeAuthors}
                  onChange={onChangeActiveAuthors}
                  searchable
                  renderMenuItem={label => (
                    <span className='font-normal text-base'>{label}</span>
                  )}
                />

                <TagPicker
                  data={groups}
                  className='min-w-searchInput mr-4 my-2 w-40 rs-theme-dark'
                  menuClassName='rs-theme-dark'
                  placeholder='Groups...'
                  onChange={onChangeActiveGroups}
                  value={activeGroups}
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
