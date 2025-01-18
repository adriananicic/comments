import { getUserReturn } from '../../user/types/get-return';

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
