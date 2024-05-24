'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { useModal } from '@/hooks/useModal';

export const AccountsHeader = () => {
  const { openModal } = useModal();

  return (
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      <CardTitle>Accounts</CardTitle>
      <Button
        className='w-10 px-0 sm:w-auto sm:px-4'
        onClick={() => openModal('accounts-new')}
      >
        <PlusIcon className='size-4 sm:me-2' />
        <span className='hidden sm:inline'>Add new</span>
      </Button>
    </CardHeader>
  );
};
