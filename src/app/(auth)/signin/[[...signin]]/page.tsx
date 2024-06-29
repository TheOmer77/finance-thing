'use client';

import {
  Connection as ClerkConnection,
  Loading as ClerkLoading,
} from '@clerk/elements/common';
import { SignIn, Step as SignInStep } from '@clerk/elements/sign-in';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { GithubIcon } from '@/components/icons/GithubIcon';

const SignInPage = () => (
  <SignIn>
    <SignInStep name='start' className='mx-auto w-full max-w-[23rem] p-6'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Welcome back!
        </h1>
        <p className='text-sm text-muted-foreground'>
          Sign in to continue to your dashboard.
        </p>
      </div>
      <ClerkLoading scope='provider:github'>
        {isLoading => (
          <ClerkConnection name='github' asChild>
            <Button type='button' disabled={isLoading} className='w-full'>
              {isLoading ? (
                <Spinner className='me-2 size-4 shrink-0 text-inherit' />
              ) : (
                <GithubIcon className='me-2 size-4 shrink-0' />
              )}
              Sign in with GitHub
            </Button>
          </ClerkConnection>
        )}
      </ClerkLoading>
      <p className='mt-2 text-xs text-muted-foreground'>
        If you don&apos;t have an account yet, it will be created when you first
        sign in.
      </p>
    </SignInStep>
  </SignIn>
);

export default SignInPage;
