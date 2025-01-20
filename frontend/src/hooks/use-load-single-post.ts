import { useEffect, useState } from 'react';

import { getCommentReturn, Post } from '@/types';
import { useAlert } from '@/components/context/AlertContext';

export const useLoadSinglePost = (postId: string) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<getCommentReturn[]>([]);
  const [isPostFetching, setIsPostFetching] = useState<boolean>(false);
  const [isCommentFetching, setIsCommentFetching] = useState<boolean>(false);
  const { setErrorMessage } = useAlert();

  const fetchPost = async () => {
    try {
      setIsPostFetching(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/post/get/${postId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const post = await res.json();
      setPost(post.data);

      setIsPostFetching(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const fetchComments = async (isRefetching: boolean, cursor?: string) => {
    try {
      setIsCommentFetching(true);

      let fetchLink = `${process.env.NEXT_PUBLIC_BE_URL}/comment/get/postComments?postId=${postId}`;
      if (isRefetching) fetchLink += `&isRefetching=${isRefetching}`;
      if (cursor) fetchLink += `&cursor=${cursor}`;

      const res = await fetch(fetchLink, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const commentList = await res.json();
      setComments(commentList.data);

      setIsCommentFetching(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const fetchReplies = async (parent: getCommentReturn) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/comment/get/replies/${parent.commentId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const repliesObject = await res.json();
      const replies: getCommentReturn[] = repliesObject.data;

      const updateComment = (
        comments: getCommentReturn[],
        parentCommentId: string
      ): getCommentReturn[] => {
        return comments.map((comment) => {
          if (comment.commentId === parentCommentId) {
            return { ...comment, childComments: replies };
          }

          if (comment.childComments) {
            return {
              ...comment,
              childComments: updateComment(
                comment.childComments,
                parentCommentId
              ),
            };
          }

          return comment;
        });
      };
      const updatedList = [...updateComment(comments, parent.commentId)];
      setComments(updatedList);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log('Error fetching replies:', error);
    }
  };

  const refetchComments = async (cursor?: string) => {
    await fetchComments(true, cursor);
  };

  const loadMoreComments = async (cursor: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/comment/get/postComments?postId=${postId}&isRefetching=&cursor=${cursor}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const prevComments = await res.json();
    const newCommentList = [...prevComments.data, ...comments];
    setComments(newCommentList);
  };

  useEffect(() => {
    fetchPost();
    fetchComments(false);
  }, []);

  return {
    post,
    isPostFetching,
    comments,
    refetchComments,
    isCommentFetching,
    fetchReplies,
    loadMoreComments,
  };
};
