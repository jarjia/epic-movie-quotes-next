export type LoginWithGoogleQueryTypes = {
  code: string | undefined | string[];
  authUser: string | undefined | string[];
  prompt: string | undefined | string[];
  scope: string | undefined | string[];
};
export type ErrorResponseTypes = {
  response: {
    data: string;
  };
};
