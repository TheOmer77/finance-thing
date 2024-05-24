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
import { useAccounts } from '@/hooks/useAccounts';
import { useModal } from '@/hooks/useModal';

import { AccountForm, type AccountFormProps } from './form';

export const AccountDrawer = () => {
  const matchesMd = useMediaQuery('(min-width: 768px)');
  const { currentModal, closeModal } = useModal();
  const { createAccount, createAccountPending } = useAccounts();

  const isCurrentModal = currentModal === 'accounts-new';

  const handleOpenChange = (open: boolean) => {
    if (!open && isCurrentModal) closeModal();
  };

  const handleSubmit: AccountFormProps['onSubmit'] = values =>
    createAccount(values, { onSuccess: () => closeModal() });

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
          <DrawerTitle>New account</DrawerTitle>
          <DrawerDescription>
            Create a new account to track your transactions.
          </DrawerDescription>
        </DrawerHeader>
        <AccountForm
          onSubmit={handleSubmit}
          disabled={createAccountPending}
          defaultValues={{ name: '' }}
        />
      </DrawerContent>
    </Drawer>
  );
};
