import { buildPaginationString } from '@shared/utils/pagination';
import { useRouter } from 'next/router';
import React from 'react';
import { Pagination } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { changeSearchState } from 'src/store/anime/list';
import { resetAnimeState } from 'src/store/anime/list';

const limitOptions = [20, 30, 50, 100];

const PageList = (): JSX.Element => {
  const router = useRouter();
  const { search, total } = useAppSelector(state => state.anime.list);
  const dispatch = useAppDispatch();

  const onChangePageOptions = (page: number) => {
    dispatch(resetAnimeState());
    dispatch(changeSearchState({ page, perPage: 20 }));
    const route = buildPaginationString({ ...search, page, perPage: 20 });
    router.push(route);
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
