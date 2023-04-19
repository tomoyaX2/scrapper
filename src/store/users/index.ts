import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { RootState } from '..';
import { State, User } from './types';

const initialState: State = {
  data: [],
  total: 0
};

export const getUsers = createAsyncThunk('get users', async () => {
  const res = await axios.get<{ data: User[]; total: number }>(
    `${backendUrl}/users`
  );

  return res.data;
});

export const changeAdminStatus = createAsyncThunk(
  'change admin status',
  async (body: { id: string; status: boolean }, store) => {
    await axios.patch(`${backendUrl}/users/change-admin-status`, body);
    store.dispatch(getUsers());
  }
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
  }
});
export default usersSlice.reducer;

export const selectUsersState = (state: RootState) => state.users;
