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
import { ScrollArea } from '@/components/ui/ScrollArea';
import { DrawerLoadingState } from '@/components/layout/DrawerLoadingState';
import { useAccounts } from '@/hooks/accounts';
import { useCategories } from '@/hooks/categories';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';
import { useTransactionById, useTransactions } from '@/hooks/transactions';
import { amountFromMilliunits, amountToMilliunits } from '@/lib/amount';

import {
  TransactionForm,
  type TransactionFormProps,
  type TransactionFormValues,
} from './form';

export const TransactionDrawer = () => {
  const matchesMd = useMediaQuery('(min-width: 768px)');
  const { currentModal, lastModal, closeModal } = useModal();

  const { createTransaction, createTransactionPending } = useTransactions();
  const [DeleteDialog, confirmDelete, deleteConfirmPending] = useConfirm({
    message: `Delete this transaction?`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const isCurrentModal =
    currentModal === 'transactions-new' ||
    !!currentModal?.startsWith('transactions-edit-');
  const lastModalWasEdit = !!lastModal?.startsWith('transactions-edit-');
  const isOpen = isCurrentModal && !deleteConfirmPending;

  const { accounts, accountsLoading } = useAccounts({
      enabled: isCurrentModal,
    }),
    { categories, categoriesLoading } = useCategories({
      enabled: isCurrentModal,
    });

  const currentTransactionId =
    (currentModal?.startsWith('transactions-edit-') &&
      currentModal.split('-')[2]) ||
    undefined;
  const {
    transaction: currentTransaction,
    transactionFetching: currentTransactionFetching,
    updateTransaction,
    updateTransactionPending,
    deleteTransaction,
    deleteTransactionPending,
  } = useTransactionById(currentTransactionId, { enabled: isOpen });

  const isPending =
      createTransactionPending ||
      updateTransactionPending ||
      deleteTransactionPending,
    isLoading =
      currentTransactionFetching || accountsLoading || categoriesLoading;

  const defaultValues = {
    accountId: currentTransaction?.accountId || '',
    categoryId: currentTransaction?.categoryId || null,
    amount: currentTransaction?.amount
      ? amountFromMilliunits(currentTransaction.amount)
      : 0,
    date: currentTransaction?.date
      ? new Date(currentTransaction?.date)
      : new Date(),
    payee: currentTransaction?.payee || '',
    notes: currentTransaction?.notes || null,
  } satisfies TransactionFormValues;

  const handleOpenChange = (open: boolean) => {
    if (
      !open &&
      isCurrentModal &&
      !deleteConfirmPending &&
      !deleteTransactionPending
    )
      closeModal();
  };

  const handleSubmit: TransactionFormProps['onSubmit'] = values => {
    const valuesToSubmit = {
      ...values,
      amount: amountToMilliunits(values.amount),
    };

    if (currentTransactionId)
      return updateTransaction(valuesToSubmit, {
        onSuccess: () => closeModal(),
      });
    createTransaction(valuesToSubmit, { onSuccess: () => closeModal() });
  };

  const handleDelete = async () => {
    if (!currentTransactionId) return;
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteTransaction(undefined, { onSuccess: () => closeModal() });
  };

  return (
    <>
      {/* TODO: Make scrollable */}
      <Drawer
        open={isOpen && !deleteTransactionPending}
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
              {lastModalWasEdit ? 'Edit transaction' : 'New transaction'}
            </DrawerTitle>
            <DrawerDescription>
              {lastModalWasEdit
                ? 'Edit this existing transaction.'
                : 'Create a new transaction to track your transactions.'}
            </DrawerDescription>
          </DrawerHeader>
          {isLoading ? (
            <DrawerLoadingState />
          ) : (
            <ScrollArea
              className='md:grow
md:[&>[data-radix-scroll-area-viewport]>*]:h-full
[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100dvh-10rem)]
md:[&>[data-radix-scroll-area-viewport]]:h-full
md:[&>[data-radix-scroll-area-viewport]]:max-h-none'
            >
              <TransactionForm
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                disabled={isPending}
                isEdit={lastModalWasEdit}
                accounts={accounts}
                categories={categories}
              />
            </ScrollArea>
          )}
        </DrawerContent>
      </Drawer>
      <DeleteDialog />
    </>
  );
};
