'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
  userId: string | null;
  setUserId: (value: string) => void;
}

const AuthContext = createContext<IAuthContext>({
  userId: null,
  setUserId: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ setUserId: setUserId, userId: userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth can only be used inside AuthContextProvider');

  return context;
};
