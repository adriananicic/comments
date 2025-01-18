export type Post = {
  postId: string;
  title: string;
  body: string;
  timestamp: Date;
  author: getUserReturn;
};

export type getUserReturn = {
  userId: string;
  username: string;
  name: string;
  profilePicture: string;
};

export type getCommentReturn = {
  commentId: string;
  body: string;
  timestamp: Date;
  parentCommentId: string | null;
  commenterId: string;
  postId: string;
  commenter: getUserReturn;
  noOfReplies: number;
  childComments?: getCommentReturn[];
};
