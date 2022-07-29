import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { TagModel, TagsState } from './types';

const initialState: TagsState = {
  tagsList: [],
  page: 1,
  perPage: 50,
  visibleTags: []
};

export const getTags = createAsyncThunk('get tags', async () => {
  const tags = await axios.get<PaginatedResponse<TagModel>>(
    `${backendUrl}/tags`
  );

  return tags.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    incrementTagsPage: state => {
      const nextPage = state.page + 1;
      const pevPage = state.page - 1;
      const startOfVisibleItems = nextPage > 2 ? pevPage * state.perPage : 0;
      const isSameAmountOfItems =
        state.visibleTags.length === state.tagsList.length;

      state.page = isSameAmountOfItems ? state.page : nextPage;

      state.visibleTags = isSameAmountOfItems
        ? state.visibleTags
        : state.tagsList.slice(startOfVisibleItems, nextPage * state.perPage);
    },
    decrementTagsPage: state => {
      const isSecondPage = state.page === 2;

      state.page = isSecondPage ? state.page : state.page - 1;

      state.visibleTags = isSecondPage
        ? state.tagsList.slice(0, state.perPage * 2)
        : state.tagsList.slice(
            (state.page - 2) * state.perPage,
            state.page * state.perPage
          );
    },
    resetTagsPage: state => {
      state.page = 1;
      state.visibleTags = state.tagsList.slice(0, state.perPage);
    },
    onSearchTags: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.visibleTags = state.tagsList.filter(el =>
        el.label.startsWith(action.payload)
      );
    }
  },
  extraReducers: builder =>
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tagsList = action.payload;
      state.visibleTags = action.payload.slice(0, state.perPage);
    })
});

export const {
  incrementTagsPage,
  decrementTagsPage,
  resetTagsPage,
  onSearchTags
} = tagsSlice.actions;

export default tagsSlice.reducer;
