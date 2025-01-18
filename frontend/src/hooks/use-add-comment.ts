import { useState } from 'react';
import { BE_URL } from '../../constants';

export const useAddComment = () => {
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);

  const addComment = async (
    commentText: string,
    commenterId: string,
    postId: string,
    parentCommentId: string | null
  ) => {
    try {
      setIsAddingComment(true);

      const res = await fetch(`${BE_URL}/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          body: commentText,
          commenterId: commenterId,
          postId: postId,
          parentCommentId: parentCommentId,
        }),
      });

      if (res.ok) console.log('Added comment');

      console.log();

      setIsAddingComment(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { isAddingComment, addComment };
};
