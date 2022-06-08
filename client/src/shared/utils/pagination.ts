import type { NextRouter } from 'next/router';

type Search = {
  tags?: string[];
  types?: string[];
  languages?: string[];
  series?: string[];
  authors?: string[];
  groups?: string[];
  name?: string;
  page?: number;
};

const buildPaginationString = (search: Search) => {
  let result = '?';

  for (const key of Object.keys(search)) {
    const searchData = search[key];
    if (searchData?.length && Array.isArray(searchData)) {
      result += `${key}=${searchData.join(',')}&`;
    }
  }

  if (search.name) {
    result += `name=${search.name}`;
  }

  if (search.page) {
    result += `page=${search.page}`;
  }
  return result;
};

const paginationChangeFactory =
  (router: NextRouter, search: Search) => (key: string) => (data: string[]) => {
    router.replace(`/${buildPaginationString({ ...search, [key]: data })}`);
  };

const buildSearchState = (
  router: NextRouter,
  perPage: number,
  changePage: (state: { page: number; perPage: number }) => void
) => {
  const initialSearch: Search = {};

  for (const routerKey of Object.keys(router.query)) {
    const key = routerKey as unknown as keyof Search & 'page' & 'name';
    const routerData = router.query[key] as unknown as keyof Search;

    switch (key) {
      case 'name': {
        initialSearch.name = routerData;
        break;
      }

      case 'page': {
        changePage({ page: parseInt(routerData), perPage });
        break;
      }

      case 'isRedirected': {
        break;
      }

      default: {
        initialSearch[key] = routerData.split(',');
      }
    }
  }

  return initialSearch;
};

export { paginationChangeFactory, buildPaginationString, buildSearchState };
