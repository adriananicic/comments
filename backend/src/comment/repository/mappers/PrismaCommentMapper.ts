import { getCommentReturn } from '../../types/getCommentReturn';
import { CommentMapper } from '../interface/commentMapperInterface';

export class PrismaCommentMapper implements CommentMapper {
  map(comment: any): getCommentReturn {
    return {
      commentId: comment.commentId,
      body: comment.body,
      timestamp: comment.timestamp,
      parentCommentId: comment.parentCommentId,
      commenterId: comment.commenterId,
      postId: comment.postId,
      commenter: {
        userId: comment.commenter.userId,
        name: comment.commenter.name,
        username: comment.commenter.username,
        profilePicture: comment.commenter.profilePicture,
      },
      noOfReplies: comment._count.childComments,
      childComments: comment.childComments?.map((child: any) =>
        this.map(child)
      ),
    };
  }
}
