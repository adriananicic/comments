import React, { FC } from 'react';
import { getPostById } from './PostsPage';
import CommentSection from '../organisms/CommentSection';

interface ISinglePostPageProps {
  id: string;
}

const SinglePostPage: FC<ISinglePostPageProps> = ({ id }) => {
  const post = getPostById(id);

  if (!post) return;

  return (
    <div className="p-10 flex h- flex-col gap-5 ">
      <h1 className="display-1">{post.title}</h1>
      <p className="body-2">{post.content}</p>
      <CommentSection />
    </div>
  );
};

export default SinglePostPage;
