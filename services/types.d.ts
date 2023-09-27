export type PostRegister = {
  name: string;
  email: string;
  password: string;
};
export type PostVerify = {
  email: string;
  token: string;
};
export type PostRecoverEmail = {
  email: string;
};
export type PostRecoverPassword = {
  password: string;
  email: string;
  recover_token: string;
};

export type LoginCredentials = {
  user: string;
  password: string;
  remember_me: boolean;
};
export type PostComment = {
  quote_id: number;
  to_user: number;
  comment: string;
};

export type Channel = {
  socketId: string;
  channelName: string;
};

export type RejectFriend = {
  friend_id: number;
  not_id?: number;
  unfriend?: boolean;
};

export type AcceptFriend = {
  friend_id: number;
  not_id?: number;
  sender_id: number;
};
