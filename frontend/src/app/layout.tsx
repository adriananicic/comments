import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
