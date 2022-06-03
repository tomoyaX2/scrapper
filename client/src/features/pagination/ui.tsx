import React from 'react';
import { Pagination } from 'rsuite';
import { $albumsState, changePageOptionsFx } from '@entities/album';
import { createView } from '@shared/lib/view';

const props = {
  albumState: $albumsState,
  onChangePageOptions: changePageOptionsFx
};
const limitOptions = [20, 30, 50, 100];

const PageList = createView()
  .props(props)
  .view(({ albumState: { perPage, page, total }, onChangePageOptions }) => (
    <div className='w-full flex items-center justify-center pb-4'>
      {console.log(page, perPage, total)}

      <Pagination
        layout={['-', 'limit', '|', 'pager']}
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
        onChangePage={(page: number) => onChangePageOptions({ page, perPage })}
        onChangeLimit={(perPage: number) =>
          onChangePageOptions({ page, perPage })
        }
      />
    </div>
  ));

export { PageList };
