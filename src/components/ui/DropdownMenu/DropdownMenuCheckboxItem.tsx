import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    {...props}
    ref={ref}
    className={cn(
      `relative flex cursor-default select-none items-center rounded-sm py-1.5
pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent
focus:text-accent-foreground data-[disabled]:pointer-events-none
data-[disabled]:opacity-50`,
      className
    )}
    checked={checked}
  >
    <span className='absolute left-2 flex size-3.5 items-center justify-center'>
      <ItemIndicator>
        <CheckIcon className='size-4' />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;
