import { getCommentReturn } from './getCommentReturn';

export type createCommentReturn = Omit<
  getCommentReturn,
  'noOfReplies',
  'commenter'
>;
