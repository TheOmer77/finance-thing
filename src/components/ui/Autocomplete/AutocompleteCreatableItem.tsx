'use client';

import {
  forwardRef,
  useContext,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { CommandItem } from 'cmdk';

import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';

export type AutocompleteCreatableItemProps = Omit<
  ComponentPropsWithoutRef<typeof CommandItem>,
  'onSelect'
> & {
  onSelect?: (inputValue: string, setValue: (value: string) => void) => void;
};

export const AutocompleteCreatableItem = forwardRef<
  ElementRef<typeof CommandItem>,
  AutocompleteCreatableItemProps
>(({ className, ...props }, ref) => {
  const { onCreatableSelect, inputValue } = useContext(AutocompleteContext);

  // TODO: Return null if inputValue exactly matches one of the options
  if (!inputValue) return null;
  return (
    <CommandItem
      {...props}
      ref={ref}
      forceMount
      value={undefined}
      onMouseDown={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onSelect={onCreatableSelect}
      className={cn(
        `relative flex w-full cursor-default select-none items-center gap-2
rounded-sm px-2 py-1.5 pl-8 text-sm outline-none aria-selected:bg-accent
aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none
data-[disabled=true]:opacity-50`,
        className
      )}
    >
      {`Create "${inputValue}"`}
    </CommandItem>
  );
});
AutocompleteCreatableItem.displayName = 'AutocompleteItem';
