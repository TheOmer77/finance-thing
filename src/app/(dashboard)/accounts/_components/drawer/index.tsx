'use client';

import { XIcon } from 'lucide-react';
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
import { DrawerLoadingState } from '@/components/layout/DrawerLoadingState';
import { useAccounts } from '@/hooks/useAccounts';
import { useAccountById } from '@/hooks/useAccountById';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';

import {
  AccountForm,
  type AccountFormProps,
  type AccountFormValues,
} from './form';

export const AccountDrawer = () => {
  const matchesMd = useMediaQuery('(min-width: 768px)');
  const { currentModal, lastModal, closeModal } = useModal();
  const { createAccount, createAccountPending } = useAccounts();
  const [DeleteDialog, confirmDelete, deleteConfirmPending] = useConfirm({
    message: `Delete this account?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const isCurrentModal =
    currentModal === 'accounts-new' ||
    !!currentModal?.startsWith('accounts-edit-');
  const lastModalWasEdit = !!lastModal?.startsWith('accounts-edit-');

  const currentAccountId =
    (currentModal?.startsWith('accounts-edit-') &&
      currentModal.split('-')[2]) ||
    undefined;
  const {
    account: currentAccount,
    accountFetching: currentAccountFetching,
    updateAccount,
    updateAccountPending,
    deleteAccount,
    deleteAccountPending,
  } = useAccountById(currentAccountId);

  const isPending =
    createAccountPending || updateAccountPending || deleteAccountPending;

  const defaultValues = {
    name: currentAccount?.name || '',
  } satisfies AccountFormValues;

  const handleOpenChange = (open: boolean) => {
    if (
      !open &&
      isCurrentModal &&
      !deleteConfirmPending &&
      !deleteAccountPending
    )
      closeModal();
  };

  const handleSubmit: AccountFormProps['onSubmit'] = values => {
    if (currentAccountId)
      return updateAccount(values, { onSuccess: () => closeModal() });
    createAccount(values, { onSuccess: () => closeModal() });
  };

  const handleDelete = async () => {
    if (!currentAccountId) return;
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteAccount(undefined, { onSuccess: () => closeModal() });
  };

  return (
    <>
      <Drawer
        open={isCurrentModal && !deleteConfirmPending && !deleteAccountPending}
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
            <DrawerLoadingState />
          ) : (
            <AccountForm
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              disabled={isPending}
              isEdit={lastModalWasEdit}
            />
          )}
        </DrawerContent>
      </Drawer>
      <DeleteDialog />
    </>
  );
};
