import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';
import { getCommentReturn, Post } from '@/types';

export const useLoadSinglePost = (postId: string) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<getCommentReturn[]>([]);
  const [isPostFetching, setIsPostFetching] = useState<boolean>(false);
  const [isCommentFetching, setIsCommentFetching] = useState<boolean>(false);

  const fetchPost = async () => {
    try {
      setIsPostFetching(true);

      const res = await fetch(`${BE_URL}/post/get/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const post = await res.json();
      setPost(post);

      setIsPostFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      setIsCommentFetching(true);

      const res = await fetch(`${BE_URL}/comments/getPostComments/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const commentList = await res.json();
      setComments(commentList);

      setIsCommentFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplies = async (parentCommentId: string) => {
    const res = await fetch(`${BE_URL}/comments/getPostComments/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const commentList = await res.json();
    // Update this logic so that it updates the list
    // setComments(commentList);
  };

  const refetchComments = () => {
    fetchComments();
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  return {
    post,
    isPostFetching,
    comments,
    refetchComments,
    isCommentFetching,
    fetchComments,
  };
};
