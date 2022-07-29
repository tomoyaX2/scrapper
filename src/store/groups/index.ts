import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { GroupModel, GroupsState } from './types';

const initialState: GroupsState = {
  groupsList: [],
  page: 1,
  perPage: 50,
  visibleGroups: []
};

export const getGroups = createAsyncThunk('get groups', async () => {
  const groups = await axios.get<PaginatedResponse<GroupModel>>(
    `${backendUrl}/groups`
  );

  return groups.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    incrementGroupsPage: state => {
      const nextPage = state.page + 1;
      const pevPage = state.page - 1;
      const startOfVisibleItems = nextPage > 2 ? pevPage * state.perPage : 0;
      const isSameAmountOfItems =
        state.visibleGroups.length === state.groupsList.length;

      state.page = isSameAmountOfItems ? state.page : nextPage;

      state.visibleGroups = isSameAmountOfItems
        ? state.visibleGroups
        : state.groupsList.slice(startOfVisibleItems, nextPage * state.perPage);
    },
    decrementGroupsPage: state => {
      const isSecondPage = state.page === 2;

      state.page = isSecondPage ? state.page : state.page - 1;

      state.visibleGroups = isSecondPage
        ? state.groupsList.slice(0, state.perPage * 2)
        : state.groupsList.slice(
            (state.page - 2) * state.perPage,
            state.page * state.perPage
          );
    },
    resetGroupsPage: state => {
      state.page = 1;
      state.visibleGroups = state.groupsList.slice(0, state.perPage);
    },
    onSearchGroup: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.visibleGroups = state.groupsList.filter(el =>
        el.label.startsWith(action.payload)
      );
    }
  },
  extraReducers: builder =>
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groupsList = action.payload;
      state.visibleGroups = action.payload.slice(0, state.perPage);
    })
});
export const {
  incrementGroupsPage,
  decrementGroupsPage,
  resetGroupsPage,
  onSearchGroup
} = groupsSlice.actions;

export default groupsSlice.reducer;
