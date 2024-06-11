import { useRef, useState } from 'react';
import { CommandGroup } from 'cmdk';

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteCreatableItem,
  AutocompleteInput,
  AutocompleteItem,
} from '@/components/ui/Autocomplete';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import { useAccounts } from './useAccounts';

const getDialogComponent = ({
  promise,
  setPromise,
  message,
}: {
  promise: { resolve: (value?: string) => void } | null;
  setPromise: (promise: { resolve: (value?: string) => void } | null) => void;
  message?: string;
}) => {
  const SelectDialog = () => {
    const { accounts, accountsLoading, createAccount, createAccountPending } =
      useAccounts();

    const selectedAccountRef = useRef<string>(),
      selectedAccountId = selectedAccountRef.current;

    const handleValueChange = (value: string) => {
      selectedAccountRef.current = value;
    };

    const handleAction = (value?: string) => {
      promise?.resolve(value);
      setPromise(null);
    };

    return (
      <Dialog open={promise !== null}>
        <DialogContent className='[&>[data-dialog-close]]:hidden'>
          <DialogHeader>
            <DialogTitle>Select account</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <div className='pt-4'>
            <Autocomplete
              value={selectedAccountId || ''}
              onValueChange={handleValueChange}
              onCreatableSelect={(name, setValue) => {
                createAccount(
                  { name },
                  { onSuccess: ({ data }) => setValue(data.id) }
                );
              }}
            >
              <AutocompleteInput
                disabled={accountsLoading || createAccountPending}
                placeholder='Select an account'
              />
              <AutocompleteContent>
                <CommandGroup>
                  {(accounts || []).map(({ id, name }) => (
                    <AutocompleteItem key={id} value={id}>
                      {name}
                    </AutocompleteItem>
                  ))}
                </CommandGroup>
                <AutocompleteCreatableItem />
              </AutocompleteContent>
            </Autocomplete>
          </div>
          <DialogFooter className='pt-2'>
            <Button variant='outline' onClick={() => handleAction()}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() => handleAction(selectedAccountRef.current)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  return SelectDialog;
};

export const useSelectAccount = ({ message }: { message?: string } = {}) => {
  const [promise, setPromise] = useState<{
    resolve: (value?: string) => void;
  } | null>(null);
  const isPending = promise !== null;

  const selectAccount = () =>
    new Promise<string | undefined>(resolve => setPromise({ resolve }));

  const SelectDialog = getDialogComponent({ promise, setPromise, message });

  return [SelectDialog, selectAccount, isPending] as const;
};
