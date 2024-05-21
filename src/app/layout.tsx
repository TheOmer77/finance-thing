import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { clerkLocalization, clerkTheme } from '@/constants/clerk';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance thing',
  description: "It's a finance app, I guess.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider appearance={clerkTheme} localization={clerkLocalization}>
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
