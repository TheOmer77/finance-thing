'use client';

import {
  forwardRef,
  useCallback,
  useContext,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { CommandItem } from 'cmdk';

import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';
import { CREATABLE_ATTR } from './constants';

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
  const {
    inputValue,
    listItems: listOptions,
    onCreatableSelect,
    onOpenChange,
    onSelect,
  } = useContext(AutocompleteContext);

  const listIncludesExactMatch = listOptions.some(
    ({ label }) => label === inputValue
  );

  const handleSelect = useCallback(() => {
    onOpenChange?.(false);
    onCreatableSelect?.(inputValue, (value: string) =>
      onSelect?.(value, inputValue)
    );
  }, [inputValue, onCreatableSelect, onOpenChange, onSelect]);

  if (!inputValue || listIncludesExactMatch) return null;
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
      onSelect={handleSelect}
      className={cn(
        `relative flex w-full cursor-default select-none items-center gap-2
        rounded-sm px-2 py-1.5 pl-8 text-sm outline-none aria-selected:bg-accent
aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none
data-[disabled=true]:opacity-50`,
        className
      )}
      {...{ [CREATABLE_ATTR]: '' }}
    >
      {`Create "${inputValue}"`}
    </CommandItem>
  );
});
AutocompleteCreatableItem.displayName = 'AutocompleteItem';
