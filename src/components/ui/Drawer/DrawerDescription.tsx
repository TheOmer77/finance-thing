import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerDescription = forwardRef<
  ElementRef<typeof Drawer.Description>,
  ComponentPropsWithoutRef<typeof Drawer.Description>
>(({ className, ...props }, ref) => (
  <Drawer.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = Drawer.Description.displayName;
