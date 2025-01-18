import { getCommentReturn } from '../../types/getCommentReturn';

export interface CommentMapper {
  mapComment(comment: any): getCommentReturn;
}
