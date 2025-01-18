import { Icon } from '@/components/atoms/Icon';
import CommentCard from './CommentCard';
import { FC } from 'react';
import { useLoadSinglePost } from '@/hooks/use-load-single-post';
import { usePathname } from 'next/navigation';
import { getCommentReturn } from '@/types';

interface ICommentReplyProps {
  reply: getCommentReturn;
  index: number;
  refetchComments: () => void;
  fetchReplies: (parent: getCommentReturn) => void;
}

const CommentReply: FC<ICommentReplyProps> = ({
  index,
  reply,
  refetchComments,
  fetchReplies,
}) => {
  const postId = usePathname().split('/')[2];
  console.log('reply: ', reply);
  return (
    <div
      onClick={() => fetchReplies(reply)}
      className="flex items-start gap-3 relative"
    >
      {index === 0 && (
        <Icon
          icon="reply"
          className="bg-primary absolute opacity-45 -left-9 "
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
