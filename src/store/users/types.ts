export type User = {
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
};

export type State = {
  data: User[];
  total: number;
};
