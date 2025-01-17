import React from 'react';
import UserCard from '../atoms/UserCard';

type mockUser = {
  name: string;
  imageUrl: string;
};

const mockUsers: mockUser[] = [
  {
    name: 'Hary',
    imageUrl:
      'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
  },
  {
    name: 'Adrian',
    imageUrl:
      'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
  },
  {
    name: 'Ivan',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4D03AQG7RFluYex77Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727864987263?e=2147483647&v=beta&t=_p_ltb_trVgZMZDlrfV3a32B3zbK9u2MENz43ek8sUE',
  },
];

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center p-4 bg-background">
      <h1 className="text-accent display-1 text-center  ">
        Choose your profile
      </h1>
      <div className="w-full h-full flex items-center justify-center gap-10">
        {mockUsers.map((user) => (
          <UserCard key={user.name} imageUrl={user.imageUrl} name={user.name} />
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
