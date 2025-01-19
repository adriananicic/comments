'use client';
import { useAuth } from '@/components/context/AuthContext';
import SinglePostPage from '@/components/pages/SinglePostPage';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const page = ({ params }: { params: { id: string } }) => {
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

  return <SinglePostPage id={params.id} />;
};

export default page;
