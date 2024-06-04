'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementRef,
  type KeyboardEvent,
  type ComponentPropsWithoutRef,
} from 'react';
import { Command as CommandRoot } from 'cmdk';
import { useIsClient } from 'usehooks-ts';

import { Popover } from '@/components/ui/Popover';
import { useCallbackRef } from '@/hooks/useCallbackRef';

import { AutocompleteContext } from './context';
import {
  CMDK_ATTR_PREFIX,
  CMDK_GROUP_ATTR,
  CMDK_ITEM_ATTR,
  CREATABLE_ATTR,
  LABEL_ATTR,
  VALUE_ATTR,
  type AutocompleteOption,
} from './constants';

export type AutocompleteProps = ComponentPropsWithoutRef<typeof CommandRoot> & {
  onCreatableSelect?: (
    inputValue: string,
    setValue: (value: string) => void
  ) => void;
};

export const Autocomplete = forwardRef<
  ElementRef<typeof CommandRoot>,
  AutocompleteProps
>(
  (
    { value, onValueChange, onCreatableSelect, onKeyDown, children, ...props },
    ref
  ) => {
    const isMounted = useIsClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [listRef, listEl] = useCallbackRef<HTMLDivElement>();

    const [isOpen, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [lastValidInputValue, setLastValidInputValue] = useState(
      inputValue || ''
    );

    // Stupid hack to get all options with their labels & values
    const listItems = useMemo(() => {
      if (!listEl) return [];
      return Array.from(listEl.children[0].children)
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
        .map(el => ({
          label: el.getAttribute(LABEL_ATTR),
          value: el.getAttribute(VALUE_ATTR),
        }))
        .filter(
          ({ label, value }) => !!label && !!value
        ) as AutocompleteOption[];
    }, [listEl]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (!input) return;
        if (!isOpen) setOpen(true);
        if (event.key === 'Escape') input.blur();

        onKeyDown?.(event);
      },
      [isOpen, onKeyDown]
    );

    const handleSelect = useCallback(
      (value: string, inputValue: string) => {
        setInputValue(inputValue);

        setLastValidInputValue(inputValue);
        onValueChange?.(value);

        // Hack to prevent the input from being focused after the user selects an option
        setTimeout(() => inputRef?.current?.blur(), 0);
      },
      [onValueChange]
    );

    useEffect(() => {
      if (!value) return;

      const initialSelectedItem = listItems.find(item => item.value === value);
      if (!initialSelectedItem) return;
      setInputValue(initialSelectedItem.label);
      setLastValidInputValue(initialSelectedItem.label);
    }, [listItems, value]);

    return (
      <AutocompleteContext.Provider
        value={{
          inputRef,
          inputValue,
          isMounted,
          isOpen,
          lastValidInputValue,
          listItems,
          listRef,
          onCreatableSelect,
          onInputValueChange: setInputValue,
          onOpenChange: setOpen,
          onSelect: handleSelect,
          value,
        }}
      >
        <Popover open={isOpen && isMounted}>
          {!isMounted ? (
            children
          ) : (
            <CommandRoot {...props} ref={ref} onKeyDown={handleKeyDown}>
              {children}
            </CommandRoot>
          )}
        </Popover>
      </AutocompleteContext.Provider>
    );
  }
);
Autocomplete.displayName = 'Autocomplete';
