'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const Drawer = ({
  shouldScaleBackground = false,
  ...props
}: ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = 'Drawer';
