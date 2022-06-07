import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import type { PaginatedResponse } from '@shared/types/responses';

type Type = {
  value: string;
  label: string;
};

type TypeModel = {
  id: string;
  name: string;
};

type TypeState = {
  activeTypes: string[];
  types: Type[];
};

const getTypesFx = createEffect<void, Type[]>();
const changeActiveTypeFx = createEvent<string[]>();

const $types = createStore<TypeState>({ types: [], activeTypes: [] });

getTypesFx.use(async () => {
  const types = await axios.get<PaginatedResponse<TypeModel>>(
    'http://localhost:8000/types'
  );

  return types.data.data.map(el => ({ label: el.name, value: el.id }));
});

$types.on(getTypesFx.doneData, (_, types) => ({ activeTypes: [], types }));

$types.on(
  changeActiveTypeFx,
  (state, activeTypes) =>
    state && {
      ...state,
      activeTypes
    }
);

export { $types, getTypesFx, changeActiveTypeFx };
