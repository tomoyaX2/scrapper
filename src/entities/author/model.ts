import axios from 'axios';
import { createEffect, createStore } from 'effector';
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
};

const getAuthorsFx = createEffect<void, Author[]>();

const $authors = createStore<AuthorsState>({ authorsList: [] });

getAuthorsFx.use(async () => {
  const authors = await axios.get<PaginatedResponse<AuthorModel>>(
    `${backendUrl}/authors`
  );

  return authors.data.data.map(el => ({ label: el.name, value: el.id }));
});

$authors.on(getAuthorsFx.doneData, (_, authorsList) => ({
  authorsList
}));

export { $authors, getAuthorsFx };
