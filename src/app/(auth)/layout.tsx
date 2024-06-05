import type { PropsWithChildren } from 'react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

import { Spinner } from '@/components/ui/Spinner';
import { Logo } from '@/components/layout/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div
    className='grid min-h-dvh w-full grid-cols-1 flex-col
place-items-center lg:grid-cols-2'
  >
    <ClerkLoading>
      <Spinner className='size-8' />
    </ClerkLoading>
    <ClerkLoaded>{children}</ClerkLoaded>
    <div
      className='relative hidden size-full place-items-center bg-primary
bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary-foreground/60
to-primary-foreground/0 to-85% before:absolute
before:start-[calc(50%-theme(spacing.24))]
before:top-[calc(50%-theme(spacing.24))] before:size-48 before:rounded-full
before:bg-primary/80 lg:grid'
    >
      <Logo className='relative size-48 fill-primary-foreground' />
    </div>
  </div>
);

export default AuthLayout;
