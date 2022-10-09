import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios, { AxiosError } from 'axios';
import type {
  AuthState,
  RegistrationFormState,
  BackEndResponseErrorKeys,
  LoginFormState
} from './types';
import { RootState } from '..';
import { keys } from '@shared/utils/keys';
import { getUser } from '../user';
import { createGallery } from '../galleries';

const initialRegistrationValues = {
  login: '',
  password: '',
  matchPassword: '',
  email: '',
  name: '',
  phone: '',
  avatarUrl: ''
};

const initialRegistrationTouched = {
  password: false,
  login: false,
  matchPassword: false,
  phone: false,
  email: false,
  name: false,
  avatarUrl: false
};

const initialLoginValues = {
  login: '',
  password: ''
};

const initialLoginTouched = {
  password: false,
  login: false
};

const backEndResponseErrorsMatch = {
  invalidPassword: 'password',
  invalidLogin: 'login',
  passwordsDontMatch: 'matchPassword',
  invalidPhone: 'phone',
  invalidEmail: 'email',
  emailExists: 'email',
  loginExists: 'login',
  incorrentInput: 'login'
};

const initialState: AuthState = {
  accessToken: '',
  registration: {
    errors: initialRegistrationValues,
    touched: initialRegistrationTouched,
    fields: initialRegistrationValues,
    visibleModal: false,
    isSubmitted: false
  },
  login: {
    errors: initialLoginValues,
    touched: initialLoginTouched,
    fields: initialLoginValues,
    visibleModal: false,
    isSubmitted: false
  }
};

type AuthResponseType = {
  accessToken: string;
  errors: Record<BackEndResponseErrorKeys, { message: string }>;
  statusCode: number;
};

export const initiateRegistration = createAsyncThunk(
  'registration',
  async (formData: RegistrationFormState, store) => {
    try {
      const res = await axios.post<AuthResponseType>(
        `${backendUrl}/auth/registration`,
        formData
      );
      localStorage.setItem('accessToken', res.data.accessToken);
      store.dispatch(createGallery('Favourites'));
      store.dispatch(getUser());
      return res.data;
    } catch (e) {
      return (e as AxiosError)?.response?.data as AuthResponseType;
    }
  }
);

export const initiateLogin = createAsyncThunk(
  'login',
  async (formData: LoginFormState, store) => {
    try {
      const res = await axios.post<AuthResponseType>(
        `${backendUrl}/auth/login`,
        formData
      );
      localStorage.setItem('accessToken', res.data.accessToken);
      store.dispatch(getUser());
      return res.data;
    } catch (e) {
      return (e as AxiosError)?.response?.data as AuthResponseType;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //registration
    changeRegistrationFields: (
      state,
      action: PayloadAction<RegistrationFormState>
    ) => {
      state.registration.fields = action.payload;
    },
    changeRegistrationErrors: (
      state,
      action: PayloadAction<Record<keyof RegistrationFormState, string>>
    ) => {
      state.registration.errors = action.payload;
    },

    changeRegistrationTouched: (
      state,
      action: PayloadAction<Record<keyof RegistrationFormState, boolean>>
    ) => {
      state.registration.touched = action.payload;
    },
    changeRegistrationModalVisible: state => {
      state.registration.visibleModal = !state.registration.visibleModal;
    },

    //login
    changeLoginFields: (state, action: PayloadAction<LoginFormState>) => {
      state.login.fields = action.payload;
    },
    changeLoginErrors: (
      state,
      action: PayloadAction<Record<keyof LoginFormState, string>>
    ) => {
      state.login.errors = action.payload;
    },

    changeLoginTouched: (
      state,
      action: PayloadAction<Record<keyof LoginFormState, boolean>>
    ) => {
      state.login.touched = action.payload;
    },
    changeLoginModalVisible: state => {
      state.login.visibleModal = !state.login.visibleModal;
    }
  },
  extraReducers: builder => {
    //registration

    builder.addCase(initiateRegistration.pending, state => {
      state.registration.isSubmitted = true;
    });
    builder.addCase(initiateRegistration.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      const errorKeys = keys(action.payload.errors);
      for (const key of errorKeys) {
        const fieldMatchedKey = backEndResponseErrorsMatch[
          key
        ] as keyof RegistrationFormState;
        state.registration.errors[fieldMatchedKey] =
          action.payload.errors[key].message;
      }
      state.registration.isSubmitted = false;
      if (!errorKeys.length) {
        state.registration.visibleModal = false;
        state.registration.errors = initialRegistrationValues;
        state.registration.fields = initialRegistrationValues;
        state.registration.touched = initialRegistrationTouched;
      }
    });

    //login

    builder.addCase(initiateLogin.pending, state => {
      state.login.isSubmitted = true;
    });
    builder.addCase(initiateLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      const errorKeys = keys(action.payload.errors);
      for (const key of errorKeys) {
        const fieldMatchedKey = backEndResponseErrorsMatch[
          key
        ] as keyof LoginFormState;
        state.login.errors[fieldMatchedKey] =
          action.payload.errors[key].message;
      }
      state.login.isSubmitted = false;
      if (!errorKeys.length) {
        state.login.visibleModal = false;
        state.login.errors = initialLoginValues;
        state.login.fields = initialLoginValues;
        state.login.touched = initialLoginTouched;
      }
    });
  }
});
export default authSlice.reducer;

export const {
  changeRegistrationFields,
  changeRegistrationErrors,
  changeRegistrationTouched,
  changeRegistrationModalVisible,
  changeLoginFields,
  changeLoginErrors,
  changeLoginModalVisible,
  changeLoginTouched
} = authSlice.actions;

export {
  initialRegistrationValues,
  initialRegistrationTouched,
  initialLoginTouched,
  initialLoginValues
};

export const selectAuthState = (state: RootState) => state.auth;
