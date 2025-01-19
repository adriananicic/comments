import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';
import { Post } from '@/types';
import { useAlert } from '@/components/context/AlertContext';

export const useLoadPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);
  const { setErrorMessage } = useAlert();

  const fetchPosts = async () => {
    try {
      setIsFetchingPosts(true);

      const res = await fetch(`${BE_URL}/post/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const posts = await res.json();
      setPosts(posts.data);

      setIsFetchingPosts(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isFetchingPosts };
};
