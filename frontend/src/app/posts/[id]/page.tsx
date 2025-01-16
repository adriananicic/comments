import SinglePostPage from '@/components/pages/SinglePostPage';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <SinglePostPage id={params.id} />;
};

export default page;
