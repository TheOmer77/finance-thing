'use client';

import { forwardRef, type ElementRef } from 'react';
import type { PopoverContentProps } from '@radix-ui/react-popover';
import { CommandList } from 'cmdk';

import { PopoverContent } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

export const AutocompleteContent = forwardRef<
  ElementRef<typeof PopoverContent>,
  PopoverContentProps
>(({ onOpenAutoFocus, className, children, ...props }, ref) => (
  <PopoverContent
    {...props}
    ref={ref}
    onOpenAutoFocus={e => {
      e.preventDefault();
      onOpenAutoFocus?.(e);
    }}
    className={cn('w-[--radix-popper-anchor-width] p-1', className)}
  >
    <CommandList>{children}</CommandList>
  </PopoverContent>
));
AutocompleteContent.displayName = 'AutocompleteContent';
