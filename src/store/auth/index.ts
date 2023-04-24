import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import axios, { AxiosError } from 'axios';
import type {
  AuthState,
  RegistrationFormState,
  BackEndResponseErrorKeys,
  LoginFormState,
  ForgotPasswordState,
  RestorePasswordState
} from './types';
import { initToken, RootState } from '..';
import { keys } from '@shared/utils/keys';
import { getUser } from '../user';
import { createGallery } from '../galleries';
import {
  defaultErrorMessage,
  defaultSuccessMessage,
  showNotification
} from '../notifications';
import { redirect } from '../navigation';

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

const initialForgotPasswordValues = {
  email: '',
  login: ''
};

const initialForgotPasswordTouched = {
  email: false,
  login: false
};

const initialRestorePasswordValues = {
  newPassword: '',
  confirmPassword: ''
};

const initialRestorePasswordTouched = {
  newPassword: false,
  confirmPassword: false
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
  },
  forgotPassword: {
    errors: initialForgotPasswordValues,
    touched: initialForgotPasswordTouched,
    fields: initialForgotPasswordValues,
    visibleModal: false,
    isSubmitted: false
  },
  restorePassword: {
    errors: initialRestorePasswordValues,
    touched: initialRestorePasswordTouched,
    fields: initialRestorePasswordValues,
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
      store.dispatch(createGallery('Recently Viewed'));
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
      initToken();
      store.dispatch(getUser());
      return res.data;
    } catch (e) {
      return (e as AxiosError)?.response?.data as AuthResponseType;
    }
  }
);

export const initiateForgotPassword = createAsyncThunk(
  'forgot password',
  async (
    {
      fields,
      resetFields
    }: {
      fields: { email: string; login: string };
      resetFields?: () => void;
    },
    store
  ) => {
    try {
      const res = await axios.post<AuthResponseType>(
        `${backendUrl}/auth/reset-password`,
        fields
      );
      store.dispatch(
        showNotification({
          ...defaultSuccessMessage,
          text: 'Restore link was sent to your email'
        })
      );
      store.dispatch(changeForgotPasswordModalVisible());
      resetFields?.();
      return res.data;
    } catch (e) {
      store.dispatch(
        showNotification({
          ...defaultErrorMessage,
          text:
            (e as AxiosError<{ errors: string }>)?.response?.data?.errors ??
            defaultErrorMessage.text
        })
      );
    }
  }
);

export const initiateRestorePassword = createAsyncThunk(
  'restore password',
  async (
    {
      fields
    }: {
      fields: RestorePasswordState & { token: string };
    },
    store
  ) => {
    try {
      const res = await axios.post<AuthResponseType>(
        `${backendUrl}/auth/restore-password`,
        fields
      );
      store.dispatch(changeForgotPasswordModalVisible());
      store.dispatch(
        showNotification({
          ...defaultSuccessMessage,
          text: 'Password has been changed. Please, log in'
        })
      );
      store.dispatch(redirect('/'));
      return res.data;
    } catch (e) {
      store.dispatch(
        showNotification({
          ...defaultErrorMessage,
          text:
            (e as AxiosError<{ errors: string }>)?.response?.data.errors ??
            defaultErrorMessage.text
        })
      );
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
    },

    //forgot password
    changeForgotPasswordFields: (
      state,
      action: PayloadAction<ForgotPasswordState>
    ) => {
      state.forgotPassword.fields = action.payload;
    },
    changeForgotPasswordErrors: (
      state,
      action: PayloadAction<Record<keyof ForgotPasswordState, string>>
    ) => {
      state.forgotPassword.errors = action.payload;
    },

    changeForgotPasswordTouched: (
      state,
      action: PayloadAction<Record<keyof ForgotPasswordState, boolean>>
    ) => {
      state.forgotPassword.touched = action.payload;
    },
    changeForgotPasswordModalVisible: state => {
      state.forgotPassword.visibleModal = !state.forgotPassword.visibleModal;
    },

    //restore password
    changeRestorePasswordFields: (
      state,
      action: PayloadAction<RestorePasswordState>
    ) => {
      state.restorePassword.fields = action.payload;
    },
    changeRestorePasswordErrors: (
      state,
      action: PayloadAction<Record<keyof RestorePasswordState, string>>
    ) => {
      state.restorePassword.errors = action.payload;
    },

    changeRestorePasswordTouched: (
      state,
      action: PayloadAction<Record<keyof RestorePasswordState, boolean>>
    ) => {
      state.restorePassword.touched = action.payload;
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
  changeLoginTouched,
  changeForgotPasswordModalVisible,
  changeForgotPasswordErrors,
  changeForgotPasswordFields,
  changeForgotPasswordTouched,
  changeRestorePasswordFields,
  changeRestorePasswordErrors,
  changeRestorePasswordTouched
} = authSlice.actions;

export {
  initialRegistrationValues,
  initialRegistrationTouched,
  initialLoginTouched,
  initialLoginValues,
  initialForgotPasswordValues,
  initialForgotPasswordTouched,
  initialRestorePasswordValues,
  initialRestorePasswordTouched
};

export const selectAuthState = (state: RootState) => state.auth;
