import axios from 'axios';
import { createEffect, createStore, createEvent } from 'effector';
import { backendUrl } from '@shared/api';
import type { PaginatedResponse } from '@shared/types/responses';

type Group = {
  value: string;
  label: string;
};

type GroupModel = {
  id: string;
  name: string;
};

type GroupsState = {
  groupsList: Group[];
  page: number;
  perPage: number;
  visibleGroups: Group[];
};

const getGroupsFx = createEffect<void, Group[]>();
const incrementGroupsFx = createEvent();
const resetGroupsFx = createEvent();
const onSearchGroupsFx = createEvent<string>();

const $groups = createStore<GroupsState>({
  groupsList: [],
  page: 1,
  perPage: 50,
  visibleGroups: []
});

$groups.on(incrementGroupsFx, state => ({
  ...state,
  page:
    state.visibleGroups.length === state.groupsList.length
      ? state.page
      : state.page + 1,
  visibleGroups:
    state.visibleGroups.length === state.groupsList.length
      ? state.visibleGroups
      : state.groupsList.slice(0, (state.page + 1) * state.perPage)
}));

$groups.on(resetGroupsFx, state => ({
  ...state,
  page: 1,
  visibleGroups: state.groupsList.slice(0, state.perPage)
}));

$groups.on(onSearchGroupsFx, (state, value) => {
  if (value) {
    return {
      ...state,
      page: 1,
      visibleGroups: state.groupsList.filter(el => el.label.startsWith(value))
    };
  }
});

getGroupsFx.use(async () => {
  const Groups = await axios.get<PaginatedResponse<GroupModel>>(
    `${backendUrl}/groups`
  );

  return Groups.data.data.map(el => ({ label: el.name, value: el.id }));
});

$groups.on(getGroupsFx.doneData, (state, groupsList) => ({
  groupsList,
  page: state.page,
  perPage: state.perPage,
  visibleGroups: groupsList.slice(0, state.perPage)
}));

export {
  $groups,
  getGroupsFx,
  incrementGroupsFx,
  resetGroupsFx,
  onSearchGroupsFx
};
