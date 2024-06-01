'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CommandGroup } from 'cmdk';

import { cn } from '@/lib/utils';

export const AutocompleteGroup = forwardRef<
  ElementRef<typeof CommandGroup>,
  ComponentPropsWithoutRef<typeof CommandGroup>
>(({ className, ...props }, ref) => (
  <CommandGroup
    ref={ref}
    className={cn(
      `overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2
[&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs
[&_[cmdk-group-heading]]:font-medium
[&_[cmdk-group-heading]]:text-muted-foreground`,
      className
    )}
    {...props}
  />
));

AutocompleteGroup.displayName = 'AutocompleteGroup';
