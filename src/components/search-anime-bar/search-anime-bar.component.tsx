import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Input } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { optionsAnimeSelector } from './selectors';
import { changeSearchState, getAnimeList } from 'src/store/anime/list';
import { buildSearchState } from '@shared/utils/pagination';
import { searchTimeoutHandler } from '@shared/utils/timeoutHandler';

let inputTimeout = setTimeout(() => {}, 0);

export const SearchAnimeBar = (): JSX.Element => {
  const { videosSelector } = useAppSelector(optionsAnimeSelector);
  const { search } = videosSelector;

  const dispatch = useAppDispatch();

  const router = useRouter();

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
        getAnimeList(
          search.shouldResetPage
            ? { ...searchData, page: 1, shouldResetPage: false }
            : searchData
        )
      );
    };
    searchTimeoutHandler(callback);
  }, [router.query]);

  const onSearchChange = (value: string) => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      if (value) {
        dispatch(getAnimeList({ title: value, page: 1, perPage: 50 }));
      } else {
        dispatch(getAnimeList({ page: 1, perPage: 20 }));
      }
    }, 800);
  };

  return (
    <div className='flex flex-col items-center w-full py-4 flex-wrap px-12'>
      <div className='flex lg:flex-row md:flex-col sm:flex-col xsm:flex-col md:items-center sm:items-start xsm:items-start w-full flex-wrap'>
        <div className='flex flex-row flex-wrap w-full justify-center items-center'>
          <Input
            name='search'
            className='min-w-searchInput mr-4 my-2 w-40 '
            onChange={onSearchChange}
            placeholder='Search By Name'
          />
        </div>
      </div>
    </div>
  );
};
