export type FeedFormLayout = {
  children: JSX.Element;
  title: string;
  isEdit?: boolean;
  isDelete?: boolean;
  quoteId?: string | null;
  modalWidth?: number | null;
};
