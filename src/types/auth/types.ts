export type User = {
  user_id: number;
  email: string;
  role: string;
  username: string;
  access_token: string;
  refresh_token: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
