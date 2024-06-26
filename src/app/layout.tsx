import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/Toaster';
import { Provider } from '@/components/providers';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance thing',
  description: "It's a finance app, I guess.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <Provider>
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  </Provider>
);

export default RootLayout;
