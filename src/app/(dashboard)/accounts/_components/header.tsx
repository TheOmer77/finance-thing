'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useAccounts } from '@/hooks/accounts';

export const AccountsHeader = () => {
  const { openModal } = useModal();
  const { accountsLoading } = useAccounts();

  return (
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      {accountsLoading ? (
        <Skeleton className='h-8 w-48' />
      ) : (
        <CardTitle>Accounts</CardTitle>
      )}
      {!accountsLoading && (
        <Button
          className='w-10 px-0 sm:w-auto sm:px-4'
          onClick={() => openModal('accounts-new')}
        >
          <PlusIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Add new</span>
        </Button>
      )}
    </CardHeader>
  );
};
