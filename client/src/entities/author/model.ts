import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
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
  activeAuthors: string[];
  authors: Author[];
};

const getAuthorsFx = createEffect<void, Author[]>();
const changeActiveAuthorFx = createEvent<string[]>();

const $authors = createStore<AuthorsState>({ authors: [], activeAuthors: [] });

getAuthorsFx.use(async () => {
  const authors = await axios.get<PaginatedResponse<AuthorModel>>(
    'http://localhost:8000/authors'
  );

  return authors.data.data.map(el => ({ label: el.name, value: el.id }));
});

$authors.on(getAuthorsFx.doneData, (_, authors) => ({
  activeAuthors: [],
  authors
}));

$authors.on(
  changeActiveAuthorFx,
  (state, activeAuthors) =>
    state && {
      ...state,
      activeAuthors
    }
);

export { $authors, getAuthorsFx, changeActiveAuthorFx };
