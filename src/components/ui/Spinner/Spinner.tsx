import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Spinner = forwardRef<
  ElementRef<typeof Loader2Icon>,
  ComponentPropsWithoutRef<typeof Loader2Icon>
>(({ className, ...props }, ref) => (
  <Loader2Icon
    {...props}
    ref={ref}
    className={cn('size-6 animate-spin text-muted-foreground', className)}
  />
));
Spinner.displayName = 'Spinner';
