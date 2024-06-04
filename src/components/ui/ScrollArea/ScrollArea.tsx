'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

import { ScrollBar } from './ScrollBar';

export const ScrollArea = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <Viewport className='h-full w-full rounded-[inherit]'>{children}</Viewport>
    <ScrollBar />
    <Corner />
  </Root>
));
ScrollArea.displayName = Root.displayName;
