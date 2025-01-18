import { getCommentReturn } from '../../types/getCommentReturn';

export interface CommentMapper {
  map(comment: any): getCommentReturn;
}
