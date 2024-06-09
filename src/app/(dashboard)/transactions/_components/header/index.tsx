'use client';

import { useSearchParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import type { ParseResult } from 'papaparse';

import { Button } from '@/components/ui/Button';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useTransactions, useTransactionsImport } from '@/hooks/transactions';

import { TransactionsImportHeader } from './import-header';
import { UploadButton } from './upload-button';

export const TransactionsHeader = () => {
  const { transactionsLoading } = useTransactions();
  const { importResult, setImportResult } = useTransactionsImport();

  const searchParams = useSearchParams(),
    isImportMode = !!searchParams.get('import') && importResult.data.length > 0;
  const { openModal } = useModal();

  const handleUpload = (result: ParseResult<string[]>) => {
    window.history.pushState(null, '', `?import=true`);
    setImportResult(result);
  };

  if (isImportMode) return <TransactionsImportHeader />;

  return (
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      {transactionsLoading ? (
        <Skeleton className='h-8 w-48' />
      ) : (
        <CardTitle>Transaction history</CardTitle>
      )}
      {!transactionsLoading && (
        <div className='flex flex-row items-center gap-2 [&>*]:shrink-0'>
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
