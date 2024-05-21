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
        `fixed bottom-0 z-50 flex flex-col bg-background shadow
shadow-neutral-900/50 focus-visible:outline-none
[&[vaul-drawer-direction=bottom]]:inset-x-0
[&[vaul-drawer-direction=bottom]]:mx-auto
[&[vaul-drawer-direction=bottom]]:mt-24 [&[vaul-drawer-direction=bottom]]:h-auto
[&[vaul-drawer-direction=bottom]]:w-dvw
[&[vaul-drawer-direction=bottom]]:max-w-screen-sm
[&[vaul-drawer-direction=bottom]]:rounded-t-lg
[&[vaul-drawer-direction=right]]:end-0 [&[vaul-drawer-direction=right]]:h-dvh
[&[vaul-drawer-direction=right]]:w-80
[&[vaul-drawer-direction=right]]:rounded-s-lg`,
        className
      )}
      {...props}
    >
      <div
        data-drawer-handle=''
        className='mx-auto mt-4 h-1 w-10 rounded-full bg-muted
transition-[height,margin] [[vaul-drawer-direction=right]>&]:hidden'
      />
      {children}
    </Drawer.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';
