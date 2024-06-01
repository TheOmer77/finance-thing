'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CommandEmpty } from 'cmdk';

import { cn } from '@/lib/utils';

export const AutocompleteEmpty = forwardRef<
  ElementRef<typeof CommandEmpty>,
  ComponentPropsWithoutRef<typeof CommandEmpty>
>(({ children, className, ...props }, ref) => (
  <CommandEmpty
    {...props}
    ref={ref}
    className={cn(
      'select-none rounded-sm p-2 text-center text-sm text-muted-foreground',
      className
    )}
  >
    {children}
  </CommandEmpty>
));
AutocompleteEmpty.displayName = 'AutocompleteEmpty';
