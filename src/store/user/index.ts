import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { RootState } from '..';
import { User } from './types';
import { getUsers } from '../users';

const initialUser: User = {
  id: '',
  login: '',
  email: '',
  name: '',
  password: '',
  isActive: true,
  twoFaEnabled: false,
  avatarUrl: '',
  phone: '',
  isAdmin: false
};

const initialState = {
  data: initialUser,
  isLoading: true
};

export const deleteUser = createAsyncThunk(
  'delete user',
  async (userId: string, store) => {
    const accessToken = localStorage.getItem('accessToken') ?? '';

    await axios.delete(`${backendUrl}/users?userIds=${userId}`, {
      headers: { access_token: accessToken }
    });
    store.dispatch(getUsers());
  }
);

export const getUser = createAsyncThunk(
  'get user',
  async (onErrorRedirect?: () => void) => {
    try {
      const accessToken = localStorage.getItem('accessToken') ?? '';
      if (!accessToken) {
        onErrorRedirect?.();
      }
      const res = await axios.get<User>(`${backendUrl}/auth/user`, {
        headers: { access_token: accessToken }
      });
      return res.data;
    } catch (e) {
      onErrorRedirect?.();
      return initialUser;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    cleanUser: state => {
      state.data = initialUser;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  }
});
export default userSlice.reducer;

export const { cleanUser } = userSlice.actions;

export const selectUserState = (state: RootState) => state.user;
