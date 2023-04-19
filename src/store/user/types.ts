export interface UserState extends UserFormState {
  data: User;
  isLoading: boolean;
  isSubmitted: boolean;
  fields: UserFormState;
  errors: Record<keyof UserFormState, string>;
  touched: Record<keyof UserFormState, boolean>;
}

export interface User {
  id: string;
  login: string;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  twoFaEnabled: boolean;
  avatarUrl: string;
  phone: string;
  isAdmin: boolean;
}

export interface UserFormState {
  login: string;
  email: string;
  name: string;
  phone?: string;
}
