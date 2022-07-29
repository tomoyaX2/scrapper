import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { RootState } from '..';
import { AuthorModel, AuthorsState } from './types';

const initialState: AuthorsState = {
  authorsList: [],
  page: 1,
  perPage: 50,
  visibleAuthors: []
};

export const getAuthors = createAsyncThunk('get authors', async () => {
  const authors = await axios.get<PaginatedResponse<AuthorModel>>(
    `${backendUrl}/authors`
  );

  return authors.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    incrementAuthorsPage: state => {
      const nextPage = state.page + 1;
      const pevPage = state.page - 1;
      const startOfVisibleItems = nextPage > 2 ? pevPage * state.perPage : 0;
      const isSameAmountOfItems =
        state.visibleAuthors.length === state.authorsList.length;

      state.page = isSameAmountOfItems ? state.page : nextPage;

      state.visibleAuthors = isSameAmountOfItems
        ? state.visibleAuthors
        : state.authorsList.slice(
            startOfVisibleItems,
            nextPage * state.perPage
          );
    },
    decrementAuthorsPage: state => {
      const isSecondPage = state.page === 2;

      state.page = isSecondPage ? state.page : state.page - 1;

      state.visibleAuthors = isSecondPage
        ? state.authorsList.slice(0, state.perPage * 2)
        : state.authorsList.slice(
            (state.page - 2) * state.perPage,
            state.page * state.perPage
          );
    },
    resetAuthorsPage: state => {
      state.page = 1;
      state.visibleAuthors = state.authorsList.slice(0, state.perPage);
    },
    onSearchAuthor: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.visibleAuthors = state.authorsList.filter(el =>
        el.label.startsWith(action.payload)
      );
    }
  },
  extraReducers: builder =>
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.authorsList = action.payload;
      state.visibleAuthors = action.payload.slice(0, state.perPage);
    })
});
export default authorsSlice.reducer;
export const {
  incrementAuthorsPage,
  decrementAuthorsPage,
  resetAuthorsPage,
  onSearchAuthor
} = authorsSlice.actions;

export const selectAuthorsState = (state: RootState) => state.authors;
