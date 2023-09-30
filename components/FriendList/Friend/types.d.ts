export type Friend = {
  data: {
    id: number;
    name: string;
    thumbnail: string;
    friends: {
      id: number;
      pivot: { status: string; from_user: number; friend_id: number };
    }[];
  };
};

export type FriendProp = {
  id: number;
  name: string;
  thumbnail: string;
  friends: {
    id: number;
    pivot: { status: string; from_user: number; friend_id: number };
  }[];
};

export type Status = {
  id: number;
  status: string;
  from_id: number;
  friend_id: number;
};
