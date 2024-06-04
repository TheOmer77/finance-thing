import { createContext, type RefObject } from 'react';

import type { AutocompleteOption } from './constants';

type AutocompleteContextValue = {
  value?: string;
  inputValue: string;
  lastValidInputValue: string;
  listItems: AutocompleteOption[];
  inputRef?: RefObject<HTMLInputElement>;
  listRef?: RefObject<HTMLDivElement>;
  isMounted?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string, inputValue: string) => void;
  onCreatableSelect?: (
    inputValue: string,
    setValue: (value: string) => void
  ) => void;
  onInputValueChange?: (value: string) => void;
};

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  inputValue: '',
  lastValidInputValue: '',
  listItems: [],
});
