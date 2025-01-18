import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';

export const useLoadPosts = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BE_URL}`);
      const posts = await res.json();
      setPosts(posts);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading };
};
