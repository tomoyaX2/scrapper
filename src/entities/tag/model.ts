import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';
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
  page: number;
  perPage: number;
  visibleTags: Tag[];
};

const getTagsFx = createEffect<void, Tag[]>();
const incrementPageFx = createEvent();
const onSearchTagFx = createEvent<string>();

const $tags = createStore<TagsState>({
  tagsList: [],
  page: 1,
  perPage: 50,
  visibleTags: []
});

$tags.on(incrementPageFx, state => ({
  ...state,
  page:
    state.visibleTags.length === state.tagsList.length
      ? state.page
      : state.page + 1,
  visibleTags:
    state.visibleTags.length === state.tagsList.length
      ? state.visibleTags
      : state.tagsList.slice(0, (state.page + 1) * state.perPage)
}));

$tags.on(onSearchTagFx, (state, value) => {
  if (value) {
    return {
      ...state,
      page: 1,
      visibleTags: state.tagsList.filter(el => el.label.startsWith(value))
    };
  }

  return {
    tagsList: state.tagsList,
    page: 1,
    perPage: 50,
    visibleTags: state.tagsList.slice(0, state.page * state.perPage)
  };
});

getTagsFx.use(async () => {
  const tags = await axios.get<PaginatedResponse<TagModel>>(
    `${backendUrl}/tags`
  );

  return tags.data.data.map(el => ({ label: el.name, value: el.id }));
});

$tags.on(getTagsFx.doneData, (state, tagsList) => ({
  tagsList,
  page: state.page,
  perPage: state.perPage,
  visibleTags: tagsList.slice(0, state.perPage)
}));

export { $tags, getTagsFx, incrementPageFx, onSearchTagFx };
