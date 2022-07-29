export type Group = {
  value: string;
  label: string;
};

export type GroupModel = {
  id: string;
  name: string;
};

export type GroupsState = {
  groupsList: Group[];
  page: number;
  perPage: number;
  visibleGroups: Group[];
};
