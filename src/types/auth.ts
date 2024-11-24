export interface UserAuthResponse {
  user_id: number;
  email: string;
  access_token: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}
