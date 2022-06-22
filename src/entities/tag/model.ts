import axios from 'axios';
import { createEffect, createStore } from 'effector';
import { backendUrl } from '@shared/api';
import type { PaginatedResponse } from '@shared/types/responses';

type Tag = {
  value: string;
  label: string;
};

type TagModel = {
  id: string;
  name: string;
};

type TagsState = {
  tagsList: Tag[];
};

const getTagsFx = createEffect<void, Tag[]>();

const $tags = createStore<TagsState>({ tagsList: [] });

getTagsFx.use(async () => {
  const tags = await axios.get<PaginatedResponse<TagModel>>(
    `${backendUrl}/tags`
  );

  return tags.data.data.map(el => ({ label: el.name, value: el.id }));
});

$tags.on(getTagsFx.doneData, (_, tagsList) => ({ tagsList }));

export { $tags, getTagsFx };
