import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const TableHead = forwardRef<
  ElementRef<'th'>,
  ComponentPropsWithoutRef<'th'>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      `h-12 px-4 text-left align-middle font-medium text-muted-foreground
[&:has([role=checkbox])]:pr-0`,
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';
