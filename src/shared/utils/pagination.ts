import type { NextRouter } from 'next/router';

type Search = {
  tags?: string[];
  types?: string[];
  languages?: string[];
  series?: string[];
  authors?: string[];
  groups?: string[];
  title?: string;
  page: number;
  perPage: number;
  sortBy?: 'rate' | 'views' | 'totalImages';
  shouldResetPage: boolean;
};

const buildPaginationString = (search: Search) => {
  let result = '?';

  for (const key of Object.keys(search)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const searchData = search[key as keyof Search];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (Array.isArray(searchData) && searchData?.length) {
      result += `${key}=${searchData.join(',')}&`;
    }
  }

  if (search.title) {
    result += `name=${search.title}`;
  }

  if (search.sortBy) {
    result += `sortBy=${search.sortBy}&`;
  }

  if (search.page) {
    result += `page=${search.shouldResetPage ? 1 : search.page}`;
  }

  return result;
};

const paginationChangeFactory =
  (router: NextRouter, setSearch: (payload: Search) => void, search: Search) =>
  (key: string) =>
  (data: string[] | string | null) => {
    setSearch({ ...search, [key]: data, shouldResetPage: true });
    router.push(
      `/${buildPaginationString({
        ...search,
        shouldResetPage: true,
        [key]: data
      })}`
    );
  };

const searchInputOptionsFactory = (
  visibleItems: { value: string; label: string }[],
  allItems: { value: string; label: string }[],
  activeIds?: string[]
) => {
  if (activeIds) {
    const itemsToAdd = allItems.filter(el => activeIds.includes(el.value));
    const restItems = visibleItems.filter(
      el => !itemsToAdd.some(existsItem => existsItem.value === el.value)
    );
    return [...itemsToAdd, ...restItems];
  }

  return visibleItems;
};

const buildSearchState = (router: NextRouter, perPage: number) => {
  const initialSearch: Search = {
    page: 1,
    perPage: 20,
    shouldResetPage: false
  };

  for (const routerKey of Object.keys(router.query)) {
    const key = routerKey as keyof Search & 'page' & 'title';
    const routerData = router.query[key] as unknown as keyof Search;

    switch (key) {
      case 'title': {
        initialSearch.title = routerData;
        break;
      }

      case 'page': {
        initialSearch.page = parseInt(routerData);
        initialSearch.perPage = perPage;
        break;
      }

      case 'sortBy': {
        initialSearch.sortBy = routerData as
          | 'rate'
          | 'views'
          | 'totalImages'
          | undefined;
        break;
      }

      case 'shouldResetPage': {
        break;
      }

      case 'isRedirected': {
        break;
      }

      default: {
        //@ts-expect-error cause i want
        initialSearch[key] = routerData.split(',');
      }
    }
  }

  return initialSearch;
};

export {
  paginationChangeFactory,
  buildPaginationString,
  buildSearchState,
  searchInputOptionsFactory
};
export type { Search };
