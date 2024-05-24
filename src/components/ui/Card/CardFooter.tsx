import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const CardFooter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
