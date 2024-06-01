'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CommandSeparator } from 'cmdk';

import { cn } from '@/lib/utils';

export const AutocompleteSeparator = forwardRef<
  ElementRef<typeof CommandSeparator>,
  ComponentPropsWithoutRef<typeof CommandSeparator>
>(({ className, ...props }, ref) => (
  <CommandSeparator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
AutocompleteSeparator.displayName = 'AutocompleteSeparator';
