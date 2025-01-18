'use client';
import { useAuth } from '@/components/context/AuthContext';
import SinglePostPage from '@/components/pages/SinglePostPage';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  const { userName } = useAuth();

  if (!window) return;
  if (!userName) window.location.href = '/login';

  return <SinglePostPage id={params.id} />;
};

export default page;
