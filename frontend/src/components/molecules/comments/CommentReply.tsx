import { Icon } from '@/components/atoms/Icon';
import CommentCard from './CommentCard';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { getCommentReturn } from '@/types';

interface ICommentReplyProps {
  reply: getCommentReturn;
  index: number;
  refetchComments: () => Promise<void>;
  fetchReplies: (parent: getCommentReturn) => void;
}

const CommentReply: FC<ICommentReplyProps> = ({
  index,
  reply,
  refetchComments,
  fetchReplies,
}) => {
  const postId = usePathname().split('/')[2];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        reply.noOfReplies > 0 ? fetchReplies(reply) : null;
      }}
      className="flex items-start gap-3 z-50   "
    >
      {index === 0 && (
        <Icon
          icon="reply"
          className="bg-primary z-[200]  opacity-45  -left-9 w-full "
        />
      )}
      <CommentCard
        comment={reply}
        refetchComments={refetchComments}
        fetchReplies={fetchReplies}
      />
    </div>
  );
};

export default CommentReply;
