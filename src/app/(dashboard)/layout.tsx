import type { PropsWithChildren } from 'react';

import { Header } from '@/components/layout/Header';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className='mx-auto mb-4 w-full max-w-screen-2xl px-4'>
      {children}
    </main>
  </>
);

export default DashboardLayout;
