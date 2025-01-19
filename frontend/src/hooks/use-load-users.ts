import { useEffect, useState } from 'react';
import { BE_URL } from '../../constants';
import { getUserReturn } from '@/types';
import { useAlert } from '@/components/context/AlertContext';

export const useLoadUsers = () => {
  const [users, setUsers] = useState<getUserReturn[]>();
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false);
  const { setErrorMessage } = useAlert();

  const fetchUsers = async () => {
    try {
      setIsFetchingUsers(true);

      const res = await fetch(`${BE_URL}/user/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const users = await res.json();
      setUsers(users.data);

      setIsFetchingUsers(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isFetchingUsers };
};
