import type { PropsWithChildren } from 'react';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className='mx-auto w-full max-w-screen-2xl px-4'>
      <Card>{children}</Card>
    </main>
  </>
);

export default DashboardLayout;
