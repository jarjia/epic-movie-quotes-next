export type PostRegisterTypes = {
  name: string;
  email: string;
  password: string;
};
export type PostVerifyTypes = {
  email: string | string[];
  token: string | string[];
};
export type PostRecoverEmailTypes = {
  email: string;
};
export type PostRecoverPasswordTypes = {
  password: string;
  email: string | string[] | undefined;
  token: string | string[] | undefined;
};
