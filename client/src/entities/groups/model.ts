import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
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
  activeGroups: string[];
  groups: Group[];
};

const getGroupsFx = createEffect<void, Group[]>();
const changeActiveGroupFx = createEvent<string[]>();

const $groups = createStore<GroupsState>({ groups: [], activeGroups: [] });

getGroupsFx.use(async () => {
  const Groups = await axios.get<PaginatedResponse<GroupModel>>(
    'http://localhost:8000/groups'
  );

  return Groups.data.data.map(el => ({ label: el.name, value: el.id }));
});

$groups.on(getGroupsFx.doneData, (_, groups) => ({ activeGroups: [], groups }));

$groups.on(
  changeActiveGroupFx,
  (state, activeGroups) =>
    state && {
      ...state,
      activeGroups
    }
);

export { $groups, getGroupsFx, changeActiveGroupFx };
