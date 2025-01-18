'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
  userName: string | null; //turn this to id when backend
  setUserName: (value: string) => void;
}

const AuthContext = createContext<IAuthContext>({
  userName: null,
  setUserName: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ setUserName: setUserName, userName: userName }}
    >
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
