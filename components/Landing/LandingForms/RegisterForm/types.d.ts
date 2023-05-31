export type PostRegisterTypes = {
  name: string;
  email: string;
  password: string;
};
export type LoginWithGoogleQueryTypes = {
  code: string | undefined | string[];
  authUser: string | undefined | string[];
  prompt: string | undefined | string[];
  scope: string | undefined | string[];
};
