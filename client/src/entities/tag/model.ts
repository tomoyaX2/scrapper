import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
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
  activeTags: string[];
  tags: Tag[];
};

const getTagsFx = createEffect<void, Tag[]>();
const changeActiveTagFx = createEvent<string[]>();

const $tags = createStore<TagsState>({ tags: [], activeTags: [] });

getTagsFx.use(async () => {
  const tags = await axios.get<PaginatedResponse<TagModel>>(
    'http://localhost:8000/tags'
  );

  return tags.data.data.map(el => ({ label: el.name, value: el.id }));
});

$tags.on(getTagsFx.doneData, (_, tags) => ({ activeTags: [], tags }));

$tags.on(
  changeActiveTagFx,
  (state, activeTags) =>
    state && {
      ...state,
      activeTags
    }
);

export { $tags, getTagsFx, changeActiveTagFx };
