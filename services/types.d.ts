export type PostRegisterTypes = {
  name: string;
  email: string;
  password: string;
};
export type PostVerifyTypes = {
  email: string;
  token: string;
};
export type PostRecoverEmailTypes = {
  email: string;
};
export type PostRecoverPasswordTypes = {
  password: string;
  email: string;
  recover_token: string;
};

export type LoginCredentialsTypes = {
  user: string;
  password: string;
  remember_me: boolean;
};
