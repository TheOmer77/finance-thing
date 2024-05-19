import type { ComponentPropsWithoutRef } from 'react';
import type { ClerkProvider } from '@clerk/nextjs';

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
    socialButtonsBlockButton: 'h-10 rounded-lg px-2 py-0',
    socialButtonsBlockButtonText: 'text-sm',
    footer: `bg-muted [&>*]:text-muted-foreground border-muted-foreground
bg-none [&>*:not(:first-of-type)]:border-0`,
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
