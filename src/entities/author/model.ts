import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';
import { backendUrl } from '@shared/api';
import type { PaginatedResponse } from '@shared/types/responses';

type Author = {
  value: string;
  label: string;
};

type AuthorModel = {
  id: string;
  name: string;
};

type AuthorsState = {
  authorsList: Author[];
  page: number;
  perPage: number;
  visibleAuthors: Author[];
};

const getAuthorsFx = createEffect<void, Author[]>();
const incrementAuthorsPageFx = createEvent();
const decrementAuthorsPageFx = createEvent();
const resetAuthorsPageFx = createEvent();
const onSearchAuthorFx = createEvent<string>();

const $authors = createStore<AuthorsState>({
  authorsList: [],
  page: 1,
  perPage: 50,
  visibleAuthors: []
});

$authors.on(incrementAuthorsPageFx, state => {
  const startOfVisibleItems =
    state.page + 1 > 2 ? (state.page - 1) * state.perPage : 0;

  return {
    ...state,
    page:
      state.visibleAuthors.length === state.authorsList.length
        ? state.page
        : state.page + 1,
    visibleAuthors:
      state.visibleAuthors.length === state.authorsList.length
        ? state.visibleAuthors
        : state.authorsList.slice(
            startOfVisibleItems,
            (state.page + 1) * state.perPage
          )
  };
});

$authors.on(decrementAuthorsPageFx, state => {
  const isSecondPage = state.page === 2;

  return {
    ...state,
    page: isSecondPage ? state.page : state.page - 1,
    visibleAuthors: isSecondPage
      ? state.authorsList.slice(0, state.perPage * 2)
      : state.authorsList.slice(
          (state.page - 2) * state.perPage,
          state.page * state.perPage
        )
  };
});

$authors.on(resetAuthorsPageFx, state => ({
  ...state,
  page: 1,
  visibleAuthors: state.authorsList.slice(0, state.perPage)
}));

$authors.on(onSearchAuthorFx, (state, value) => {
  if (value) {
    return {
      ...state,
      page: 1,
      visibleTags: state.authorsList.filter(el => el.label.startsWith(value))
    };
  }
});

getAuthorsFx.use(async () => {
  const authors = await axios.get<PaginatedResponse<AuthorModel>>(
    `${backendUrl}/authors`
  );

  return authors.data.data.map(el => ({ label: el.name, value: el.id }));
});

$authors.on(getAuthorsFx.doneData, (state, authorsList) => ({
  authorsList,
  page: state.page,
  perPage: state.perPage,
  visibleAuthors: authorsList.slice(0, state.perPage)
}));

export {
  $authors,
  getAuthorsFx,
  onSearchAuthorFx,
  incrementAuthorsPageFx,
  resetAuthorsPageFx,
  decrementAuthorsPageFx
};
