'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import AddComment from '../molecules/comments/AddComment';
import CommentCard from '../molecules/comments/CommentCard';
import CommentDate from '../molecules/comments/CommentDate';
import CommentContextProvider from '../context/CommentContext';
import { useLoadSinglePost } from '@/hooks/use-load-single-post';
import { formatDateFromTimestamp } from '@/lib/date-format';

interface ICommentSectionProps {
  postId: string;
}
const CommentSection: FC<ICommentSectionProps> = ({ postId }) => {
  const { comments, refetchComments, fetchReplies } = useLoadSinglePost(postId);

  const commentsRef = useRef<HTMLDivElement | null>(null);
  const containerScrollRef = useRef<HTMLDivElement | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [firstCommentId, setFirstCommentId] = useState<string>('');

  const handleScroll = () => {
    if (containerScrollRef.current) {
      if (containerScrollRef.current.scrollTop === 0) {
        // setFirstCommentId(comments[0].id);
        // loadMoreComments();
        const element = document.getElementById(firstCommentId);
        element?.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    if (commentsRef.current)
      if (containerScrollRef.current?.scrollTop !== 0 || isInitialLoad)
        commentsRef.current.scrollIntoView();
    setIsInitialLoad(false);
  }, [comments]);

  return (
    <div className="w-full flex items-center flex-col">
      <h3 className="display-2 m-4">Comments:</h3>
      <CommentContextProvider>
        <div
          ref={containerScrollRef}
          onScroll={handleScroll}
          className="max-w-[1000px] h-[550px] px-6 w-full overflow-y-auto bg-background rounded-md border-[1px] border-primary"
        >
          <div className="flex flex-col gap-4 relative min-h-full py-8">
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div id={comment.commentId} key={index}>
                  {index === 0 && <CommentDate date={comment.timestamp} />}
                  {comments[index + 1] &&
                    formatDateFromTimestamp(comment.timestamp) !==
                      formatDateFromTimestamp(
                        comments[index + 1].timestamp
                      ) && <CommentDate date={comments[index + 1].timestamp} />}
                  <CommentCard
                    fetchReplies={fetchReplies}
                    key={comment.commentId}
                    comment={comment}
                    refetchComments={refetchComments}
                  />
                </div>
              ))}
          </div>
          <AddComment refetchComments={refetchComments} />

          <div ref={commentsRef} />
        </div>
      </CommentContextProvider>
    </div>
  );
};

export default CommentSection;
