import { useRouter } from 'next/router';
import React from 'react';
import { Pagination } from 'rsuite';
import {
  $albumsState,
  $search,
  changePageOptionsFx,
  searchAlbumsFx
} from '@entities/album';
import { createView } from '@shared/lib/view';
import { buildPaginationString } from '@shared/utils/pagination';

const props = {
  albums: $albumsState,
  search: $search,
  changePageOptions: changePageOptionsFx,
  handleSearch: searchAlbumsFx
};
const limitOptions = [20, 30, 50, 100];

const PageList = createView()
  .props(props)
  .view(
    ({
      albums: { perPage, page, total },
      changePageOptions,
      handleSearch,
      search
    }) => {
      const router = useRouter();

      const onChangePageOptions = (page: number) => {
        changePageOptions({ page, perPage });
        router.replace(`/${buildPaginationString({ ...search, page })}`);
        handleSearch({ ...search, page, perPage });
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
            limit={perPage}
            limitOptions={limitOptions}
            maxButtons={10}
            activePage={page}
            onChangePage={onChangePageOptions}
          />
        </div>
      );
    }
  );

export { PageList };
