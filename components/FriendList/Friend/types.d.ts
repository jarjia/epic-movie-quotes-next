import { FriendData } from '@/context/types';
import { SetState } from '@/types';

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
  update: null | FriendData;
  setFriendData: SetState<null | { from: number; status: string }>;
};

export type Status = {
  id: number;
  status: string;
  from_id: number;
  friend_id: number;
};
