'use client';
import { useAuth } from '@/components/context/AuthContext';
import PostsPage from '@/components/pages/PostsPage';
import React from 'react';

const page = () => {
  const { userName } = useAuth();

  if (!window.location) return;
  if (!userName) window.location.href = '/login';
  return <PostsPage />;
};

export default page;
