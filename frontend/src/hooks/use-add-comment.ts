import { useState } from 'react';

import { useAlert } from '@/components/context/AlertContext';

export const useAddComment = () => {
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const { setErrorMessage, setSuccessMessage } = useAlert();

  const addComment = async (
    commentText: string,
    commenterId: string,
    postId: string,
    parentCommentId: string | null
  ) => {
    try {
      setIsAddingComment(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/comment/create`,
        {
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
        }
      );

      if (res.ok) setSuccessMessage('Comment added');

      setIsAddingComment(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return { isAddingComment, addComment };
};
