import { formatDateFromTimestamp } from '@/lib/date-format';
import { FC } from 'react';

interface ICommentDateProps {
  timestamp: number;
}

const CommentDate: FC<ICommentDateProps> = ({ timestamp }) => {
  return (
    <p className="p-[10px] font-sans leading-3 font-medium text-primary text-[13px] text-center m-2">
      {formatDateFromTimestamp(timestamp)}
    </p>
  );
};

export default CommentDate;
