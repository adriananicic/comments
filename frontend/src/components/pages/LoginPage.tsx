'use client';
import React from 'react';
import UserCard from '../atoms/UserCard';
import { useLoadUsers } from '@/hooks/use-load-users';
import Spinner from '../atoms/Spinner';

type mockUser = {
  name: string;
  imageUrl: string;
};

const LoginPage = () => {
  const { isFetchingUsers, users } = useLoadUsers();

  return (
    <div className="w-screen h-screen flex flex-col justify-center p-4 bg-background">
      <h1 className="text-accent display-1 text-center  ">
        Choose your profile
      </h1>
      <div className="w-full h-full flex items-center justify-center gap-10">
        {isFetchingUsers || !users ? (
          <Spinner />
        ) : (
          users.map((user) => <UserCard key={user.name} user={user} />)
        )}
      </div>
    </div>
  );
};

export default LoginPage;
