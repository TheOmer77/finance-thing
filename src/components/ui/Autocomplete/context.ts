import { createContext, type RefObject } from 'react';

import type { AutocompleteProps } from './Autocomplete';

type AutocompleteContextValue = {
  value?: string;
  inputValue: string;
  lastValidInputValue: string;
  inputRef?: RefObject<HTMLInputElement>;
  listRef?: RefObject<HTMLDivElement>;
  isMounted?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string, inputValue: string) => void;
  onCreatableSelect?: AutocompleteProps['onCreatableSelect'];
  onInputValueChange?: (value: string) => void;
};

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  inputValue: '',
  lastValidInputValue: '',
});
