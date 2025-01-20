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
  const { comments, refetchComments, fetchReplies, loadMoreComments } =
    useLoadSinglePost(postId);

  const containerScrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollToBottomFlag, setScrollToBottomFlag] = useState<boolean>(true);


  const handleScroll = () => {
    const container = containerScrollRef.current;
    if (!container) return;

    if (container.scrollTop === 0) {
      loadMoreComments(comments[0].commentId);
    }
  };

  useEffect(() => {
    const container = containerScrollRef.current;
    if (!container) return;

    if (scrollToBottomFlag) {
      container.scrollTop = container.scrollHeight;
      setScrollToBottomFlag(false);
    } else {
      const prevScrollHeight = container.scrollHeight;
      const prevScrollTop = container.scrollTop;

      const timeout = setTimeout(() => {
        container.scrollTop =
          prevScrollTop + (container.scrollHeight - prevScrollHeight);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [comments, scrollToBottomFlag]);


  const handleNewComment = async () => {
    await refetchComments(comments[0].commentId);
    setScrollToBottomFlag(true);
  };

  useEffect(() => {
    setScrollToBottomFlag(true);
  }, []);

  return (
    <div className="w-full flex items-center flex-col">
      <h3 className="display-2 m-4">Comments:</h3>
      <CommentContextProvider>
        <div
          ref={containerScrollRef}
          onScroll={handleScroll}
          className="max-w-[1000px] h-[550px] px-6 w-full overflow-y-auto bg-background rounded-md border-[1px] border-primary"
        >
          <div className="flex flex-col w-full gap-4 relative min-h-full py-8 sm:overflow-x-hidden">
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div id={comment.commentId} key={index}>
                  {index === 0 && <CommentDate date={comment.timestamp} />}
                  <CommentCard
                    fetchReplies={fetchReplies}
                    key={comment.commentId}
                    comment={comment}
                    refetchComments={refetchComments}
                  />
                  {comments[index + 1] &&
                    formatDateFromTimestamp(comment.timestamp) !==
                      formatDateFromTimestamp(
                        comments[index + 1].timestamp
                      ) && <CommentDate date={comments[index + 1].timestamp} />}
                </div>
              ))}
          </div>
          <AddComment refetchComments={handleNewComment} />
        </div>
      </CommentContextProvider>
    </div>
  );
};

export default CommentSection;
