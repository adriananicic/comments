import AuthContextProvider, { useAuth } from '@/components/context/AuthContext';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
