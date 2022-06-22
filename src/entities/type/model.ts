import axios from 'axios';
import { createEffect, createStore } from 'effector';
import { backendUrl } from '@shared/api';
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
  typesList: Type[];
};

const getTypesFx = createEffect<void, Type[]>();

const $types = createStore<TypeState>({ typesList: [] });

getTypesFx.use(async () => {
  const types = await axios.get<PaginatedResponse<TypeModel>>(
    `${backendUrl}/types`
  );

  return types.data.data.map(el => ({ label: el.name, value: el.id }));
});

$types.on(getTypesFx.doneData, (_, typesList) => ({ typesList }));

export { $types, getTypesFx };
