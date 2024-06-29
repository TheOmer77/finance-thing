'use client';

import {
  Connection as ClerkConnection,
  Loading as ClerkLoading,
} from '@clerk/elements/common';
import { SignUp, Step as SignUpStep } from '@clerk/elements/sign-up';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { GithubIcon } from '@/components/icons/GithubIcon';

const SignUpPage = () => (
  <SignUp>
    <SignUpStep name='start' className='mx-auto w-full max-w-[23rem] p-6'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Let&apos;s get started
        </h1>
        <p className='text-sm text-muted-foreground'>
          Click the button below to create your account.
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
              Sign up with GitHub
            </Button>
          </ClerkConnection>
        )}
      </ClerkLoading>
    </SignUpStep>
  </SignUp>
);

export default SignUpPage;
