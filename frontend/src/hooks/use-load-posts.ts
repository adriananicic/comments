import { useEffect, useState } from 'react';

import { Post } from '@/types';

export const useLoadPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setIsFetchingPosts(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/post/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const posts = await res.json();
      setPosts(posts.data);

      setIsFetchingPosts(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isFetchingPosts };
};
