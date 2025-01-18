import { useState } from 'react';
import { BE_URL } from '../../constants';

export const useDeleteComment = () => {
  const [isCommentDeleting, setIsCommentDeleting] = useState<boolean>(false);

  const deleteComment = async (commentId: string) => {
    const res = await fetch(`${BE_URL}/comment/delete/${commentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) console.log('Comment deleted');
  };

  return { isCommentDeleting, deleteComment };
};
