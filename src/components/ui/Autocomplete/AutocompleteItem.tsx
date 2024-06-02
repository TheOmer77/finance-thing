'use client';

import {
  forwardRef,
  useContext,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { CommandItem } from 'cmdk';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';

export const AutocompleteItem = forwardRef<
  ElementRef<typeof CommandItem>,
  ComponentPropsWithoutRef<typeof CommandItem>
>(({ value, className, children, ...props }, ref) => {
  const { value: selectedValue, onSelect } = useContext(AutocompleteContext);

  const isSelected = value === selectedValue;
  return (
    <CommandItem
      {...props}
      ref={ref}
      onMouseDown={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onSelect={inputValue => {
        if (!value) return;
        onSelect?.(value, inputValue);
      }}
      className={cn(
        `relative flex w-full cursor-default select-none items-center gap-2
rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent
aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none
data-[disabled=true]:opacity-50`,
        !isSelected ? 'pl-8' : null,
        className
      )}
    >
      {isSelected ? <CheckIcon className='size-4' /> : null}
      {children}
    </CommandItem>
  );
});
AutocompleteItem.displayName = 'AutocompleteItem';
