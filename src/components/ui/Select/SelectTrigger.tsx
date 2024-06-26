import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { SelectIcon, Trigger } from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectIcon asChild>
      <ChevronDownIcon className='ms-2 size-4 opacity-50' />
    </SelectIcon>
  </Trigger>
));
SelectTrigger.displayName = Trigger.displayName;
