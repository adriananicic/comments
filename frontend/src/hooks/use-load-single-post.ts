import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';

export const useLoadSinglePost = () => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BE_URL}`);
      const post = await res.json();
      setPost(post);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { post, loading };
};
