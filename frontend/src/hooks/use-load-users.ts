import { useEffect, useState } from 'react';

import { getUserReturn } from '@/types';

export const useLoadUsers = () => {
  const [users, setUsers] = useState<getUserReturn[]>();
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      setIsFetchingUsers(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/user/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const users = await res.json();
      setUsers(users.data);

      setIsFetchingUsers(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isFetchingUsers };
};
