import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerOverlay = forwardRef<
  ElementRef<typeof Drawer.Overlay>,
  ComponentPropsWithoutRef<typeof Drawer.Overlay>
>(({ className, ...props }, ref) => (
  <Drawer.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
  />
));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
