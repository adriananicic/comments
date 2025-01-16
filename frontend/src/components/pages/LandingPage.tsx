'use client';
import React from 'react';
import Button from '../atoms/Button';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-background flex flex-col gap-4 justify-center items-center">
      <h1 className="text-accent display-1">HarAddit</h1>
      <h2 className="text-primary body-2 ">
        The best place to talk about anything
      </h2>
      <div className="mt-4 flex items-center justify-between text-2 gap-10">
        <Link target="_blank" href={'https://github.com/adriananicic/comments'}>
          <Button buttonType="normal" label="Code Review" />
        </Link>
        <Link href={'/posts'}>
          <Button buttonType="normal" label="View Blogs" />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
