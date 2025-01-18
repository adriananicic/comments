import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';

export const useLoadUsers = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BE_URL}`);
      const users = await res.json();
      setUsers(users);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading };
};
