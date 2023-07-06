export type FeedBaseInput = {
  type: string;
  errorName: string;
  name: string;
  label: string;
  lang: string;
  errors: Record<string | {}>;
  defaultVal?: string;
};
