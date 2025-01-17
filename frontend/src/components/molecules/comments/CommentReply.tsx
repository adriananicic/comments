import { Icon } from '@/components/atoms/Icon';
import CommentCard from './CommentCard';
import { FC } from 'react';

interface ICommentReplyProps {
  reply: any;
  index: number;
}

const CommentReply: FC<ICommentReplyProps> = ({ index, reply }) => {
  return (
    <div className="flex items-start gap-3 relative">
      {index === 0 && (
        <Icon
          icon="reply"
          className="bg-primary absolute opacity-45 -left-9 "
        />
      )}
      <CommentCard comment={reply} />
    </div>
  );
};

export default CommentReply;
