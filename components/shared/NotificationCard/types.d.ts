import { SetState } from '@/types';

export type NotificationCard = {
  type: string;
  name: string;
  thumbnail: string;
  ago: string;
  id: number;
  seen: number;
  created_at: string;
  quoteId: number;
  setIsNotification: SetState<boolean>;
  to_user: number;
  from: { id: number };
};
