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
        variant='flat-nav'
        className={cn('justify-start', active && 'bg-muted md:bg-white/10')}
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
