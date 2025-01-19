import React, { FC } from 'react';
import { getPostById } from './PostsPage';
import CommentSection from '../organisms/CommentSection';
import { useLoadSinglePost } from '@/hooks/use-load-single-post';
import Spinner from '../atoms/Spinner';

interface ISinglePostPageProps {
  id: string;
}

const SinglePostPage: FC<ISinglePostPageProps> = ({ id }) => {
  const { isPostFetching, post } = useLoadSinglePost(id);

  if (!post) return;
  if (isPostFetching) return <Spinner />;

  return (
    <div className="p-10 flex h- flex-col gap-5 ">
      <h1 className="display-1">{post.title}</h1>
      <p className="body-2">{post.body}</p>
      <CommentSection postId={id} />
    </div>
  );
};

export default SinglePostPage;
