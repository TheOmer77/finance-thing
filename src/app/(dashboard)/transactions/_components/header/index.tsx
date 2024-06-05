'use client';

import { PlusIcon } from 'lucide-react';
import type { ParseResult } from 'papaparse';

import { Button } from '@/components/ui/Button';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useTransactions } from '@/hooks/transactions';

import { UploadButton } from './upload-button';

export const TransactionsHeader = () => {
  const { openModal } = useModal();
  const { transactionsLoading } = useTransactions();

  const handleUpload = (result: ParseResult<string[]>) => {
    const [headers, ...data] = result.data;
    console.table(
      data.reduce(
        (arr, curr) => [
          ...arr,
          headers.reduce(
            (obj, header, index) => ({
              ...obj,
              [header]: curr[index],
            }),
            {}
          ),
        ],
        [] as unknown[]
      )
    );
    console.log(result);

    window.history.pushState(null, '', `?import=true`);
  };

  return (
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      {transactionsLoading ? (
        <Skeleton className='h-8 w-48' />
      ) : (
        <CardTitle>Transaction history</CardTitle>
      )}
      {!transactionsLoading && (
        <div className='flex flex-row items-center gap-2'>
          <UploadButton onUpload={handleUpload} />
          <Button
            variant='primary'
            className='w-10 px-0 sm:w-auto sm:px-4'
            onClick={() => openModal('transactions-new')}
          >
            <PlusIcon className='size-4 sm:me-2' />
            <span className='hidden sm:inline'>Add new</span>
          </Button>
        </div>
      )}
    </CardHeader>
  );
};
