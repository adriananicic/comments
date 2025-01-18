'use client';
import { useAuth } from '@/components/context/AuthContext';
import PostsPage from '@/components/pages/PostsPage';
import React from 'react';

const page = () => {
  const { userId } = useAuth();

  if (!window.location) return;
  if (!userId) window.location.href = '/login';
  return <PostsPage />;
};

export default page;
