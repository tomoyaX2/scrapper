import React from 'react';
import { Pagination } from 'rsuite';

const limitOptions = [30, 50, 100];

export const PageList = (): JSX.Element => {
  const [activePage, setActivePage] = React.useState(1);
  const [limit, setLimit] = React.useState(50);

  return (
    <div className='w-full flex items-center justify-center pb-4'>
      <Pagination
        layout={['-', 'limit', '|', 'pager']}
        size='sm'
        prev
        next
        first
        last
        ellipsis
        total={100}
        limit={limit}
        limitOptions={limitOptions}
        maxButtons={10}
        activePage={activePage}
        onChangePage={setActivePage}
        onChangeLimit={setLimit}
      />
    </div>
  );
};
