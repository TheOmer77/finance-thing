import type { ComponentPropsWithoutRef } from 'react';
import type { ClerkProvider } from '@clerk/nextjs';

import { buttonVariants } from '@/components/ui/Button/variants';
import { cn } from '@/lib/utils';

type Appearance = ComponentPropsWithoutRef<typeof ClerkProvider>['appearance'];
type Localization = ComponentPropsWithoutRef<
  typeof ClerkProvider
>['localization'];

export const clerkTheme = {
  elements: {
    rootBox: 'size-full',
    cardBox:
      'bg-background size-full max-w-full rounded-none border-0 shadow-none',
    card: `mx-auto w-full max-w-sm grow rounded-none border-none bg-transparent
shadow-none`,
    header: 'text-start',
    headerTitle: 'text-foreground text-3xl font-bold tracking-tight',
    headerSubtitle: 'text-muted-foreground text-sm',
    socialButtonsBlockButton: buttonVariants({ variant: 'outline' }),
    socialButtonsBlockButtonText: '[font-size:inherit]',
    footer: `bg-muted [&>*]:text-muted-foreground border-muted-foreground
bg-none [&>*:not(:first-of-type)]:border-0`,
    footerAction:
      'text-sm text-muted-foreground [&>*]:[font-size:inherit] [&>span]:text-inherit',
    footerActionLink: cn(
      buttonVariants({
        variant: 'link',
        className: 'h-auto px-0 py-0 hover:text-primary',
      })
    ),
  },
} satisfies Appearance;

export const clerkLocalication = {
  signIn: {
    start: {
      title: 'Welcome back!',
      subtitle: 'Sign in to continue to your dashboard.',
    },
  },
  signUp: {
    start: {
      title: "Let's get started",
      subtitle: 'Fill in your details below to create your account.',
    },
  },
} satisfies Localization;