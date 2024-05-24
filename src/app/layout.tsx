import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/Toaster';
import { ClerkProvider } from '@/components/providers/ClerkProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance thing',
  description: "It's a finance app, I guess.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <html lang='en'>
      <QueryProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </QueryProvider>
    </html>
  </ClerkProvider>
);

export default RootLayout;
