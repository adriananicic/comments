import { useState } from 'react';
import { useAlert } from '@/components/context/AlertContext';

export const useDeleteComment = () => {
  const [isCommentDeleting, setIsCommentDeleting] = useState<boolean>(false);
  const { setErrorMessage, setSuccessMessage } = useAlert();

  const deleteComment = async (commentId: string) => {
    setIsCommentDeleting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/comment/delete/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

      if (res.ok) setSuccessMessage('Comment deleted');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setIsCommentDeleting(false);
  };

  return { isCommentDeleting, deleteComment };
};
