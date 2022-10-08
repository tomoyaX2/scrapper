import { useRouter } from 'next/router';
import React from 'react';
import { Pagination } from 'rsuite';
import { buildPaginationString } from '@shared/utils/pagination';
import { useAppDispatch, useAppSelector } from 'src/store';
import { changeSearchState, resetAlbumState } from 'src/store/albums';

const limitOptions = [20, 30, 50, 100];

const PageList = (): JSX.Element => {
  const router = useRouter();
  const { search, total } = useAppSelector(state => state.albums);
  const dispatch = useAppDispatch();

  const onChangePageOptions = (page: number) => {
    dispatch(resetAlbumState());
    dispatch(changeSearchState({ ...search, page, perPage: 20 }));
    router.push(`/${buildPaginationString({ ...search, page, perPage: 20 })}`);
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
