export type BackEndResponseErrorKeys =
  | 'invalidPassword'
  | 'invalidLogin'
  | 'passwordsDontMatch'
  | 'invalidPhone'
  | 'invalidEmail';

export type AuthState = {
  accessToken: string;
  registration: {
    errors: Record<keyof RegistrationFormState, string>;
    fields: RegistrationFormState;
    touched: Record<keyof RegistrationFormState, boolean>;
    visibleModal: boolean;
    isSubmitted: boolean;
  };
  login: {
    errors: Record<keyof LoginFormState, string>;
    fields: LoginFormState;
    touched: Record<keyof LoginFormState, boolean>;
    visibleModal: boolean;
    isSubmitted: boolean;
  };
  forgotPassword: {
    errors: Record<keyof ForgotPasswordState, string>;
    fields: Record<keyof ForgotPasswordState, string>;
    touched: Record<keyof ForgotPasswordState, boolean>;
    visibleModal: boolean;
    isSubmitted: boolean;
  };
  restorePassword: {
    errors: Record<keyof RestorePasswordState, string>;
    fields: Record<keyof RestorePasswordState, string>;
    touched: Record<keyof RestorePasswordState, boolean>;
    visibleModal: boolean;
    isSubmitted: boolean;
  };
};

export type RegistrationFormState = {
  login: string;
  password: string;
  matchPassword: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
};

export type LoginFormState = {
  login: string;
  password: string;
};

export type ForgotPasswordState = {
  login: string;
  email: string;
};

export type RestorePasswordState = {
  newPassword: string;
  confirmPassword: string;
};
