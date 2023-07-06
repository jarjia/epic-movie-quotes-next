export type FeedBaseTextarea = {
  name: string;
  label: string;
  lang: string;
  errorName: string;
  errors: Record<string | {}>;
  defaultVal?: string;
};
