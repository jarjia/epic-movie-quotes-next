export type NotificationCardTypes = {
  type: string;
  name: string;
  thumbnail: string;
  ago: string;
  id: number;
  seen: number;
  created_at: string;
  quoteId: number;
  handleisNotification: () => void;
};
