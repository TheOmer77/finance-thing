'use client';

import {
  forwardRef,
  useContext,
  useEffect,
  useState,
  type ElementRef,
} from 'react';
import type { PopoverContentProps } from '@radix-ui/react-popover';
import { CommandList } from 'cmdk';

import { PopoverContent } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';

export const AutocompleteContent = forwardRef<
  ElementRef<typeof PopoverContent>,
  PopoverContentProps
>(({ onOpenAutoFocus, className, children, ...props }, ref) => {
  const { isOpen } = useContext(AutocompleteContext);
  const [openedOnce, setOpenedOnce] = useState(false);

  useEffect(() => {
    if (isOpen && !openedOnce) setOpenedOnce(isOpen);
  }, [isOpen, openedOnce]);

  if (!openedOnce) return null;

  return (
    <PopoverContent
      {...props}
      ref={ref}
      forceMount
      onOpenAutoFocus={e => {
        e.preventDefault();
        onOpenAutoFocus?.(e);
      }}
      className={cn(
        'z-[60] w-[--radix-popper-anchor-width] p-1 fill-mode-forwards',
        !isOpen && '!pointer-events-none',
        !openedOnce && 'hidden',
        className
      )}
    >
      <CommandList>{children}</CommandList>
    </PopoverContent>
  );
});
AutocompleteContent.displayName = 'AutocompleteContent';
