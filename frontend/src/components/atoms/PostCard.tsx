import React, { FC } from 'react';

export interface IPostCard {
  title: string;
  content: string;
}

const PostCard: FC<IPostCard> = ({ content, title }) => {
  return (
    <div className="rounded-lg  relative bg-primary w-60 h-60 flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-all duration-300 group ">
      <div className="absolute text-center flex flex-col gap-2 p-8 top-0 left-0 w-full h-full object-cover rounded-lg opacity-50 transition-all duration-300 group-hover:blur-sm active:blur-none">
        <h2 className="body-1 h-full flex items-center justify-center text-primary-weak ">
          {title}
        </h2>
      </div>

      <p className="absolute text-primary-weak z-10 text-center opacity-0 transition-all duration-300 group-hover:opacity-100 font-semibold">
        View More
      </p>
    </div>
  );
};

export default PostCard;
