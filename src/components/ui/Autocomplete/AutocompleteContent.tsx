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
  const { isMounted, isOpen, listRef } = useContext(AutocompleteContext);
  const [openedOnce, setOpenedOnce] = useState(false);

  useEffect(() => {
    if (isOpen && !openedOnce) setOpenedOnce(isOpen);
  }, [isOpen, openedOnce]);

  return (
    <PopoverContent
      {...props}
      ref={ref}
      forceMount={isMounted || undefined}
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
      <CommandList ref={listRef}>{children}</CommandList>
    </PopoverContent>
  );
});
AutocompleteContent.displayName = 'AutocompleteContent';
