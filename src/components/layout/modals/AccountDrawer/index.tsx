'use client';

import { Loader2Icon, XIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/Drawer';
import { useAccounts } from '@/hooks/useAccounts';
import { useAccount } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';

import { AccountForm, type AccountFormProps } from './form';

export const AccountDrawer = () => {
  const matchesMd = useMediaQuery('(min-width: 768px)');
  const { currentModal, lastModal, closeModal } = useModal();
  const { createAccount, createAccountPending } = useAccounts();

  const currentAccountId =
    (currentModal !== null &&
      currentModal.startsWith('accounts-edit-') &&
      currentModal.split('-')[2]) ||
    undefined;
  const isCurrentModal = currentModal === 'accounts-new' || !!currentAccountId;
  const lastModalWasEdit = !!lastModal?.startsWith('accounts-edit-');

  const { account: currentAccount, accountFetching: currentAccountFetching } =
    useAccount(currentAccountId);

  const defaultValues = {
    name: (!currentAccountFetching && currentAccount?.name) || '',
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && isCurrentModal) closeModal();
  };

  const handleSubmit: AccountFormProps['onSubmit'] = values => {
    // TODO: Run update account mutation
    if (currentAccountId) return alert('Account editing not implemented yet.');
    createAccount(values, { onSuccess: () => closeModal() });
  };

  return (
    <Drawer
      open={isCurrentModal}
      onOpenChange={handleOpenChange}
      direction={matchesMd ? 'right' : 'bottom'}
    >
      <DrawerContent className='w-96 space-y-4'>
        <DrawerClose asChild>
          <Button variant='flat' size='icon' className='absolute end-2 top-0'>
            <XIcon className='size-4' />
          </Button>
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle>
            {lastModalWasEdit ? 'Edit account' : 'New account'}
          </DrawerTitle>
          <DrawerDescription>
            {lastModalWasEdit
              ? 'Edit this existing account.'
              : 'Create a new account to track your transactions.'}
          </DrawerDescription>
        </DrawerHeader>
        {currentAccountFetching ? (
          <div className='grid h-16 w-full place-items-center'>
            <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <AccountForm
            onSubmit={handleSubmit}
            disabled={createAccountPending}
            defaultValues={defaultValues}
            id={currentAccountId}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};
