import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      `flex cursor-default select-none items-center rounded-sm px-2 py-1.5
text-sm outline-none focus:bg-accent data-[state=open]:bg-accent`,
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ms-auto size-4' />
  </SubTrigger>
));
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;
