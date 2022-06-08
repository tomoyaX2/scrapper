import axios from 'axios';
import { createEffect, createStore } from 'effector';
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
};

const getGroupsFx = createEffect<void, Group[]>();

const $groups = createStore<GroupsState>({ groupsList: [] });

getGroupsFx.use(async () => {
  const Groups = await axios.get<PaginatedResponse<GroupModel>>(
    'http://localhost:8000/groups'
  );

  return Groups.data.data.map(el => ({ label: el.name, value: el.id }));
});

$groups.on(getGroupsFx.doneData, (_, groupsList) => ({ groupsList }));

export { $groups, getGroupsFx };
