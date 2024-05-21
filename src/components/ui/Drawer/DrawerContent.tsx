import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer } from 'vaul';

import { DrawerPortal } from './primitives';
import { cn } from '@/lib/utils';
import { DrawerOverlay } from './DrawerOverlay';

export const DrawerContent = forwardRef<
  ElementRef<typeof Drawer.Content>,
  ComponentPropsWithoutRef<typeof Drawer.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <Drawer.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
        className
      )}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
      {children}
    </Drawer.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';
