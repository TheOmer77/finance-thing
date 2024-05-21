import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerTitle = forwardRef<
  ElementRef<typeof Drawer.Title>,
  ComponentPropsWithoutRef<typeof Drawer.Title>
>(({ className, ...props }, ref) => (
  <Drawer.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = Drawer.Title.displayName;
