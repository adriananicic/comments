import { useState } from 'react';
import { BE_URL } from '../../constants';

export const useDeleteComment = () => {
  const [isCommentDeleting, setIsCommentDeleting] = useState<boolean>(false);

  const deleteComment = async (commentId: string) => {
    setIsCommentDeleting(true);

    const res = await fetch(`${BE_URL}/comment/delete/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) console.log('Comment deleted');
    setIsCommentDeleting(false);
  };

  return { isCommentDeleting, deleteComment };
};
