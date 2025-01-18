import { Icon } from '@/components/atoms/Icon';
import CommentRenderer from './CommentRenderer';
import { FC, useState } from 'react';
import { formatTimeFromTimestamp } from '@/lib/time-format';
import CommentReply from './CommentReply';
import { useCommentId } from '@/components/context/CommentContext';

interface ICommentCardProps {
  comment: any; //Change this
}

const CommentCard: FC<ICommentCardProps> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const { setReplyToId, setReplyToText } = useCommentId();

  const handleReplyClick = (text: string) => {
    setReplyToId(comment.id);
    setReplyToText(text);
  };

  return (
    <div className="flex items-start justify-start gap-3  ">
      <img
        height={48}
        width={48}
        className="rounded-full object-cover w-[48px] h-[48px] flex-shrink-0"
        src={comment.author.picture}
        alt={comment.author.name}
      />
      <div className="flex flex-col gap-3">
        <div
          onClick={() => setShowReplies((prev) => !prev)}
          className="flex max-w-max flex-col bg-primary-weak rounded-md border-[1px] border-primary-medium p-6 gap-3 cursor-pointer "
        >
          <p className="text-primary-strong body-1">{comment.author.name}</p>
          <CommentRenderer text={comment.text} />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base text-primary font-medium">
            {formatTimeFromTimestamp(comment.timestamp)}
          </p>
          <Icon size={2} className="bg-primary" icon="dot" />
          <p
            onClick={() => handleReplyClick(comment.text)}
            className="text-base font-medium text-accent cursor-pointer"
          >
            Reply {comment.replies && `(${comment.replies.length})`}
          </p>
        </div>
        {showReplies &&
          comment.replies?.map((reply: any, index: number) => (
            <CommentReply key={index} index={index} reply={reply} />
          ))}
      </div>
    </div>
  );
};

export default CommentCard;
