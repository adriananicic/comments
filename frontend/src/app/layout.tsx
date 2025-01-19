import type { Metadata } from 'next';
import './globals.css';
import AlertContextProvider from '@/components/context/AlertContext';

export const metadata: Metadata = {
  title: 'HarAddit',
  description: 'Best blogs out there',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen overflow-x-hidden py-4">
        <AlertContextProvider>{children}</AlertContextProvider>
      </body>
    </html>
  );
}
