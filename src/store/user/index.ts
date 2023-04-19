import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { RootState } from '..';
import { User, UserFormState, UserState } from './types';
import { getUsers } from '../users';
import {
  showNotification,
  defaultErrorMessage,
  defaultSuccessMessage
} from '../notifications';

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

const initialUserFields = { login: '', email: '', phone: '', name: '' };
const initialUserTouched = {
  login: false,
  email: false,
  phone: false,
  name: false
};
const initialUserErrors = { login: '', email: '', phone: '', name: '' };

const initialState: UserState = {
  data: initialUser,
  fields: initialUserFields,
  errors: initialUserErrors,
  touched: initialUserTouched,
  isLoading: true,
  isSubmitted: false,
  login: '',
  email: '',
  name: ''
};

export const deleteUser = createAsyncThunk(
  'delete user',
  async (userId: string, store) => {
    await axios.delete(`${backendUrl}/users?userIds=${userId}`);
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
      const res = await axios.get<User>(`${backendUrl}/auth/user`);
      return res.data;
    } catch (e) {
      onErrorRedirect?.();
      return initialUser;
    }
  }
);

export const updateUser = createAsyncThunk(
  'update user',
  async (
    {
      fields
    }: {
      fields: UserFormState;
    },
    store
  ) => {
    try {
      const res = await axios.patch<User>(
        `${backendUrl}/users/update-profile`,
        fields
      );
      store.dispatch(showNotification(defaultSuccessMessage));
      return res.data;
    } catch (e) {
      store.dispatch(showNotification(defaultErrorMessage));
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
    },
    //login
    chageUserFields: (state, action: PayloadAction<UserFormState>) => {
      state.fields = action.payload;
    },
    changeUserErrors: (
      state,
      action: PayloadAction<Record<keyof UserFormState, string>>
    ) => {
      state.errors = action.payload;
    },

    changeUserTouched: (
      state,
      action: PayloadAction<Record<keyof UserFormState, boolean>>
    ) => {
      state.touched = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fields = {
        login: action.payload.login,
        email: action.payload.email,
        phone: action.payload.phone,
        name: action.payload.name
      };
      state.isLoading = false;
    });
  }
});
export default userSlice.reducer;

export const {
  cleanUser,
  chageUserFields,
  changeUserErrors,
  changeUserTouched
} = userSlice.actions;

export { initialUserErrors, initialUserTouched, initialUserFields };
export const selectUserState = (state: RootState) => state.user;
