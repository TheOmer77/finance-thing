'use client';

import {
  forwardRef,
  useContext,
  useMemo,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { CommandItem } from 'cmdk';

import { cn } from '@/lib/utils';

import { AutocompleteContext } from './context';

const CMDK_ATTR_PREFIX = 'cmdk-',
  CMDK_ITEM_ATTR = `${CMDK_ATTR_PREFIX}item`,
  CMDK_GROUP_ATTR = `${CMDK_ATTR_PREFIX}group`,
  CREATABLE_ATTR = 'data-creatable-item',
  VALUE_ATTR = 'data-value';

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
  const { onCreatableSelect, inputValue, listRef } =
    useContext(AutocompleteContext);

  const listEl = listRef?.current;

  // Stupid hack to find if inputValue exactly matches one of the options
  const listIncludesExactMatch = useMemo(() => {
    if (!listEl) return false;
    const listValues = Array.from(listEl.children[0].children)
      .reduce((arr, child) => {
        const attributeNames = child.getAttributeNames();
        const cmdkAttribute = attributeNames.filter(attr =>
          attr.startsWith(CMDK_ATTR_PREFIX)
        )[0];

        if (
          !cmdkAttribute ||
          ![CMDK_ITEM_ATTR, CMDK_GROUP_ATTR].includes(cmdkAttribute) ||
          attributeNames.includes(CREATABLE_ATTR)
        )
          return arr;
        if (cmdkAttribute === CMDK_ITEM_ATTR) return [...arr, child];

        const groupItems = Array.from(child.children[0].children);
        return [...arr, ...groupItems];
      }, [] as Element[])
      .map(el => el.getAttribute(VALUE_ATTR))
      .filter(Boolean) as string[];

    return listValues.includes(inputValue);
  }, [inputValue, listEl]);

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
      onSelect={onCreatableSelect}
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
