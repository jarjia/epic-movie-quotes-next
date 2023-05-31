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
  token: string;
};
export type LoginCredentialsTypes = {
  user: string;
  password: string;
  remember_me: boolean;
};
export type LoginWithGoogleQueryTypes = {
  code: string | undefined | string[];
  authUser: string | undefined | string[];
  prompt: string | undefined | string[];
  scope: string | undefined | string[];
};
