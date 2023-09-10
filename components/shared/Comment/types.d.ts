export type SingleComment = {
  comment: {
    created_at: string;
    comment: string;
    user: {
      thumbnail: string;
      name: string;
    };
  };
};
