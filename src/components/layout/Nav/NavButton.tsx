'use client';

import { forwardRef, type ElementRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type NavButtonProps = {
  href: `/${string}`;
  label: string;
  active?: boolean;
};

export const NavButton = forwardRef<ElementRef<'button'>, NavButtonProps>(
  ({ active, href, label, ...props }, ref) => {
    const searchParams = useSearchParams();
    return (
      <Button
        {...props}
        ref={ref}
        variant='flat'
        className={cn(
          `justify-start text-inherit hover:text-inherit md:hover:bg-primary-foreground/20`,
          active && 'bg-muted md:bg-primary-foreground/10'
        )}
        asChild
      >
        <Link
          href={
            searchParams.size > 0 ? `${href}?${searchParams.toString()}` : href
          }
        >
          {label}
        </Link>
      </Button>
    );
  }
);
NavButton.displayName = 'NavButton';
