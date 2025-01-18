import { getCommentReturn } from '../../comment/types/getCommentReturn';
import { getUserReturn } from '../../user/types/get-return';

export type getPostReturn = {
  postId: string;
  title: string;
  body: string;
  timestamp: Date;
  author: getUserReturn;
  comments: getCommentReturn[];
};
