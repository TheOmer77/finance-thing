import type { PropsWithChildren } from 'react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2Icon } from 'lucide-react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div
    className='grid min-h-dvh w-full grid-cols-1 flex-col
place-items-center lg:grid-cols-2'
  >
    <ClerkLoading>
      <Loader2Icon className='text-muted-foreground size-8 animate-spin' />
    </ClerkLoading>
    <ClerkLoaded>{children}</ClerkLoaded>
    <div className='bg-primary hidden size-full lg:block'></div>
  </div>
);

export default AuthLayout;
