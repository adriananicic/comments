'use client';
import { useAuth } from '@/components/context/AuthContext';
import PostsPage from '@/components/pages/PostsPage';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/login');
    }
  }, [userId, router]);

  if (!userId) {
    return null;
  }

  return <PostsPage />;
};

export default Page;
