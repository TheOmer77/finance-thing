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
import { useCategories } from '@/hooks/useCategories';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';
import { useTransactionById } from '@/hooks/useTransactionById';
import { useTransactions } from '@/hooks/useTransactions';
import { amountFromMiliunits, amountToMiliunits } from '@/lib/convertAmount';

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
  } = useTransactionById(currentTransactionId);

  const isPending =
      createTransactionPending ||
      updateTransactionPending ||
      deleteTransactionPending,
    isLoading =
      currentTransactionFetching || accountsLoading || categoriesLoading;

  const defaultValues = {
    accountId:
      (!currentTransactionFetching && currentTransaction?.accountId) || '',
    amount:
      !currentTransactionFetching && currentTransaction?.amount
        ? amountFromMiliunits(currentTransaction.amount)
        : 0,
    date:
      !currentTransactionFetching && currentTransaction?.date
        ? new Date(currentTransaction?.date)
        : new Date(),
    payee: (!currentTransactionFetching && currentTransaction?.payee) || '',
    categoryId:
      (!currentTransactionFetching && currentTransaction?.categoryId) || null,
    notes: (!currentTransactionFetching && currentTransaction?.notes) || null,
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
      amount: amountToMiliunits(values.amount),
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
        open={
          isCurrentModal && !deleteConfirmPending && !deleteTransactionPending
        }
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
            <div className='grid h-16 w-full place-items-center'>
              <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <TransactionForm
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              disabled={isPending}
              isEdit={lastModalWasEdit}
              accounts={accounts}
              categories={categories}
            />
          )}
        </DrawerContent>
      </Drawer>
      <DeleteDialog />
    </>
  );
};
