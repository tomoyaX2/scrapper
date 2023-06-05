import React from 'react';
import { Pagination } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { changeSearchState } from 'src/store/albums';
import { resetAnimeState } from 'src/store/anime/list';

const limitOptions = [20, 30, 50, 100];

const PageList = (): JSX.Element => {
  const { search, total } = useAppSelector(state => state.albums);
  const dispatch = useAppDispatch();

  const onChangePageOptions = (page: number) => {
    dispatch(resetAnimeState());
    dispatch(changeSearchState({ page, perPage: 20 }));
  };

  return (
    <div className='w-full flex items-center justify-center pb-4 mt-8'>
      <Pagination
        layout={['pager']}
        size='sm'
        prev
        next
        first
        last
        ellipsis
        total={total}
        limit={search.perPage}
        limitOptions={limitOptions}
        maxButtons={5}
        activePage={search.page}
        onChangePage={onChangePageOptions}
      />
    </div>
  );
};

export { PageList };
