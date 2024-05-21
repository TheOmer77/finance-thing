import { forwardRef, type ElementRef } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type NavButtonProps = {
  href: `/${string}`;
  label: string;
  active?: boolean;
};

export const NavButton = forwardRef<ElementRef<'button'>, NavButtonProps>(
  ({ active, href, label, ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      variant='flat'
      className={cn(
        `justify-start text-inherit hover:text-inherit
lg:hover:bg-primary-foreground/20`,
        active && 'bg-muted lg:bg-primary-foreground/10'
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
);
NavButton.displayName = 'NavButton';
