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
      setPost(post.data);

      setIsPostFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      setIsCommentFetching(true);

      const res = await fetch(
        `${BE_URL}/comment/getPostComments?postId=${postId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const commentList = await res.json();
      setComments(commentList.data);
      console.log(commentList.data);

      setIsCommentFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplies = async (parent: getCommentReturn) => {
    try {
      const res = await fetch(
        `${BE_URL}/comment/getPostComments?postId=${postId}&parentCommentId=${parent.commentId}`,
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

      const asdf = updateComment(comments, parent.commentId);
      setComments(asdf);
      console.log('comments: ', comments);
    } catch (error) {
      console.log('Error fetching replies:', error);
    }
  };

  const refetchComments = async () => {
    await fetchComments();
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
    fetchReplies,
  };
};
