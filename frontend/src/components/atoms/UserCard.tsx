import React, { FC } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

interface IUserCardProps {
  name: string;
  imageUrl: string;
}

const UserCard: FC<IUserCardProps> = ({ imageUrl, name }) => {
  const { setUserName } = useAuth();
  const router = useRouter();

  const handleSelection = () => {
    setUserName(name);
    router.push('/posts');
  };

  return (
    <div
      onClick={handleSelection}
      className="rounded-lg relative bg-gradient-to-br from-primary-strong to-accent w-48 h-48 flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-all duration-300 group"
    >
      <img
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-50 transition-all duration-300 group-hover:blur-sm active:blur-none"
        src={imageUrl}
        alt={name}
      />

      <p className="absolute text-primary-weak z-10 text-center opacity-0 transition-all duration-300 group-hover:opacity-100 font-semibold">
        {name}
      </p>
    </div>
  );
};

export default UserCard;
