import { createContext, type RefObject } from 'react';

type AutocompleteContextValue = {
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputValue: string;
  placeholder?: string;
  isMounted?: boolean;
  isOpen?: boolean;
  onSelect: (value: string, inputValue: string) => void;
  onInputValueChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  inputValue: '',
  onSelect: () => {},
  onInputValueChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
});
