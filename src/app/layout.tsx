import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@/components/providers/ClerkProvider';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance thing',
  description: "It's a finance app, I guess.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
