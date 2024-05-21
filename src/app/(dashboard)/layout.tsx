import type { PropsWithChildren } from 'react';

import { Header } from '@/components/layout/Header';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className='mx-auto w-full max-w-screen-2xl px-4'>
      <h1 className='mb-2 text-3xl font-bold tracking-tight'>Dashboard</h1>
      {children}
    </main>
  </>
);

export default DashboardLayout;
