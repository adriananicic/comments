import { formatDateFromTimestamp } from '@/lib/date-format';
import { FC } from 'react';

interface ICommentDateProps {
  date: Date;
}

const CommentDate: FC<ICommentDateProps> = ({ date }) => {
  return (
    <p className="p-[10px] font-sans leading-3 font-medium text-primary text-[13px] text-center m-2">
      {formatDateFromTimestamp(date)}
    </p>
  );
};

export default CommentDate;
