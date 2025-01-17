import React from 'react';
import PostCard, { IPostCard } from '../atoms/PostCard';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
const mockPosts: { id: string; title: string; content: string }[] = [
  {
    id: '1',
    title: 'Exploring the Power of React Hooks',
    content:
      'React hooks are one of the most powerful features introduced in React. They allow developers to use state and other React features without writing a class component. In this post, we’ll dive deep into how to use hooks effectively in your projects.',
  },
  {
    id: '2',
    title: 'Getting Started with Tailwind CSS',
    content:
      'Tailwind CSS is a utility-first CSS framework that can help you build custom designs without having to write custom CSS. In this article, we’ll explore how to get started with Tailwind CSS and build a beautiful, responsive web page.',
  },
  {
    id: '3',
    title: 'Best Practices for Building REST APIs',
    content:
      'Building a robust and scalable REST API is key to many web applications. In this post, we’ll go over best practices for designing, developing, and testing REST APIs that are easy to maintain and scale over time.',
  },
  {
    id: '4',
    title: 'Understanding JavaScript Promises',
    content:
      'JavaScript promises are a powerful way to handle asynchronous operations in your code. This post explains how promises work and how to use them effectively to avoid callback hell and manage async flows more easily.',
  },
  {
    id: '5',
    title: 'Introduction to Next.js for Server-Side Rendering',
    content:
      'Next.js is a React framework that enables server-side rendering (SSR) out of the box. In this article, we’ll explore how to set up a Next.js application and the benefits of server-side rendering for SEO and performance.',
  },
  {
    id: '6',
    title: 'The Benefits of Test-Driven Development (TDD)',
    content:
      'Test-Driven Development (TDD) is a software development practice where tests are written before the code itself. In this post, we’ll discuss the benefits of TDD, including improved code quality, easier refactoring, and faster development cycles.',
  },
];

export function getPostById(id: string): IPostCard | undefined {
  return mockPosts.find((post) => post.id === id);
}

const PostsPage = () => {
  const { userName } = useAuth();
  return (
    <div className="w-screen h-screen flex flex-col justify-center p-4 bg-background">
      <h1 className="text-accent display-1 text-center  ">
        Read something interesting
        {userName}
      </h1>
      <div className="flex items-center justify-center w-full h-full p-5">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-3 items-center justify-center place-items-center ">
          {mockPosts.map((post) => (
            <Link key={post.id} href={`posts/${post.id}`}>
              <PostCard
                key={post.title}
                content={post.content}
                title={post.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
