export type AddFriendList = {
  id: number;
  name: string;
  thumbnail: string;
  friends: {
    id: number;
    pivot: { status: string; from_user: number; friend_id: number };
  }[];
};
