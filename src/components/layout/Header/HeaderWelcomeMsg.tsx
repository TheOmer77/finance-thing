'use client';

import { useUser } from '@clerk/nextjs';

export const HeaderWelcomeMsg = () => {
  const { user } = useUser();

  return (
    <div className='mb-4 mt-6 space-y-1 lg:mt-12 lg:space-y-2'>
      <h2 className='text-2xl font-bold tracking-tight lg:text-4xl'>{`Welcome back${user?.firstName ? `, ${user.firstName}` : ''} 👋🏻`}</h2>
      <p className='text-sm text-primary-foreground/75 lg:text-base'>
        Here&apos;s your financial overview report.
      </p>
    </div>
  );
};
