import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const Textarea = forwardRef<
  ElementRef<'textarea'>,
  ComponentPropsWithoutRef<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={cn(
      `flex min-h-20 w-full rounded-md border border-input bg-background
px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
      className
    )}
  />
));
Textarea.displayName = 'Textarea';
