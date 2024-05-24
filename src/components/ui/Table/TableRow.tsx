import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const TableRow = forwardRef<
  ElementRef<'tr'>,
  ComponentPropsWithoutRef<'tr'>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      `border-b transition-colors hover:bg-muted/50
data-[state=selected]:bg-muted`,
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';
