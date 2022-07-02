import { useRouter } from 'next/router';
import React from 'react';
import { Pagination } from 'rsuite';
import {
  $albumsState,
  $search,
  changeSearchStateFx,
  resetAlbumStateFx,
  searchAlbumsFx
} from '@entities/album';
import { createView } from '@shared/lib/view';
import { buildPaginationString } from '@shared/utils/pagination';

const props = {
  albums: $albumsState,
  search: $search,
  handleSearch: searchAlbumsFx,
  setSearch: changeSearchStateFx,
  resetAlbumState: resetAlbumStateFx
};
const limitOptions = [20, 30, 50, 100];

const PageList = createView()
  .props(props)
  .view(({ albums: { total }, search, setSearch, resetAlbumState }) => {
    const router = useRouter();

    const onChangePageOptions = (page: number) => {
      resetAlbumState();
      setSearch({ ...search, page, perPage: 20 });
      router.replace(
        `/${buildPaginationString({ ...search, page, perPage: 20 })}`
      );
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
  });

export { PageList };
