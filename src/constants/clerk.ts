import type { ComponentPropsWithoutRef } from 'react';
import type { ClerkProvider } from '@clerk/nextjs';

import { buttonVariants } from '@/components/ui/Button/variants';
import { cn } from '@/lib/utils';

type Appearance = ComponentPropsWithoutRef<typeof ClerkProvider>['appearance'];

export const clerkTheme = {
  elements: {
    rootBox: 'size-full',
    card: `mx-auto w-full max-w-sm grow border-none bg-transparent
shadow-none`,
    header: 'text-start',
    headerTitle: `text-foreground text-3xl font-bold tracking-tight
[.cl-actionCard_&]:text-xl [.cl-actionCard_&]:font-semibold`,
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
    navbar: `bg-muted bg-none [&>:last-child]:hidden [&_h1+p]:text-sm
[&_h1+p]:text-muted-foreground [&_h1]:font-semibold [&_h1]:tracking-tight
[&_h1]:text-foreground`,
    navbarButton: 'text-sm h-10 [&[data-active=true]]:bg-foreground/10',
    navbarButtonIcon: 'size-4',
    profileSectionTitleText: 'text-sm',
  },
  signIn: {
    elements: {
      cardBox:
        'bg-background size-full max-w-full rounded-none border-0 shadow-none',
    },
  },
  signUp: {
    elements: {
      cardBox:
        'bg-background size-full max-w-full rounded-none border-0 shadow-none',
    },
  },
} satisfies Appearance;
