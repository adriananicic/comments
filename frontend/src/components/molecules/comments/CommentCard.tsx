import { Icon } from '@/components/atoms/Icon';
import CommentRenderer from './CommentRenderer';
import { FC, useState } from 'react';
import { formatTimeFromTimestamp } from '@/lib/time-format';
import CommentReply from './CommentReply';
import { useCommentId } from '@/components/context/CommentContext';
import { useAuth } from '@/components/context/AuthContext';
import Button from '@/components/atoms/Button';
import { getCommentReturn } from '@/types';
import { useDeleteComment } from '@/hooks/use-delete-comment';

interface ICommentCardProps {
  comment: getCommentReturn;
  refetchComments: () => Promise<void>;
  fetchReplies: (parent: getCommentReturn) => void;
}

const CommentCard: FC<ICommentCardProps> = ({
  comment,
  refetchComments,
  fetchReplies,
}) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const { setReplyToId, setReplyToText, setReplyToName } = useCommentId();
  const { deleteComment, isCommentDeleting } = useDeleteComment();
  const { userId } = useAuth();

  const handleReplyClick = (text: string) => {
    setReplyToId(comment.commentId);
    setReplyToText(text);
    setReplyToName(comment.commenter.name);
  };

  const handleDeleteClick = async (commentId: string) => {
    await deleteComment(commentId);
    await refetchComments();
  };

  return (
    <div className="flex items-start justify-start gap-3 w-full ">
      <img
        height={48}
        width={48}
        className="rounded-full object-cover w-[48px] h-[48px] flex-shrink-0"
        src={comment.commenter.profilePicture}
        alt={comment.commenter.name}
      />
      <div className="flex flex-col gap-3 overflow-hidden ">
        <div className="flex  items-center gap-2">
          <div
            onClick={() => setShowReplies((prev) => !prev)}
            className="flex  flex-col bg-primary-weak rounded-md border-[1px] border-primary-medium p-6 gap-3 cursor-pointer break-words overflow-hidden text-ellipsis "
          >
            <p className="text-primary-strong body-1">
              {comment.commenter.name}
            </p>
            <CommentRenderer text={comment.body} />
          </div>
          {comment.commenter.userId === userId && (
            <Button
              loading={isCommentDeleting}
              buttonType="danger"
              icon="delete"
              onClick={() => {
                handleDeleteClick(comment.commentId);
              }}
            />
          )}
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base text-primary font-medium">
            {formatTimeFromTimestamp(comment.timestamp)}
          </p>
          <Icon size={2} className="bg-primary" icon="dot" />
          <p
            onClick={() => handleReplyClick(comment.body)}
            className="text-base font-medium text-accent cursor-pointer"
          >
            Reply {comment.noOfReplies ? `(${comment.noOfReplies})` : ''}
          </p>
        </div>
        {showReplies &&
          comment.childComments?.map(
            (reply: getCommentReturn, index: number) => (
              <CommentReply
                fetchReplies={fetchReplies}
                key={index}
                index={index}
                reply={reply}
                refetchComments={refetchComments}
              />
            )
          )}
      </div>
    </div>
  );
};

export default CommentCard;
