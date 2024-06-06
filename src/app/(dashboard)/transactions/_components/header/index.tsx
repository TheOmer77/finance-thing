'use client';

import { useSearchParams } from 'next/navigation';
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react';
import type { ParseResult } from 'papaparse';

import { Button } from '@/components/ui/Button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useTransactions, useTransactionsImport } from '@/hooks/transactions';

import { UploadButton } from './upload-button';
import { REQUIRED_FIELDS } from '../table/constants';

export const TransactionsHeader = () => {
  const { transactionsLoading } = useTransactions();
  const { importResult, setImportResult, selectedColumns, resetImport } =
    useTransactionsImport();

  const searchParams = useSearchParams(),
    isImportMode = !!searchParams.get('import') && importResult.data.length > 0;
  const { openModal } = useModal();

  const progress = Object.values(selectedColumns).filter(
      value => value && REQUIRED_FIELDS.includes(value)
    ).length,
    progressLeft = REQUIRED_FIELDS.length - progress,
    canContinueImport = progress >= REQUIRED_FIELDS.length;

  const handleUpload = (result: ParseResult<string[]>) => {
    window.history.pushState(null, '', `?import=true`);
    setImportResult(result);
  };

  const handleImportCancel = () => {
    window.history.back();
    resetImport();
  };

  return (
    <div className='flex flex-row items-center justify-between space-y-0'>
      {transactionsLoading ? (
        <Skeleton className='h-8 w-48' />
      ) : (
        <CardHeader>
          <CardTitle>
            {isImportMode ? 'Import transactions' : 'Transaction history'}
          </CardTitle>
          {isImportMode && (
            <CardDescription>
              {canContinueImport
                ? 'All required fields are used.'
                : progressLeft === 1
                  ? `${progressLeft} more field required.`
                  : `${progressLeft} more fields required.`}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {!transactionsLoading && (
        <div className='flex flex-row items-center gap-2 pe-6 [&>*]:shrink-0'>
          {isImportMode ? (
            <>
              <Button
                className='w-10 px-0 sm:w-auto sm:px-4'
                onClick={handleImportCancel}
              >
                <XIcon className='size-4 sm:me-2' />
                <span className='hidden sm:inline'>Cancel</span>
              </Button>
              <Button
                variant='primary'
                className='w-10 px-0 sm:w-auto sm:px-4'
                disabled={!canContinueImport}
              >
                <CheckIcon className='size-4 sm:me-2' />
                <span className='hidden sm:inline'>Continue</span>
              </Button>
            </>
          ) : (
            <>
              <UploadButton onUpload={handleUpload} />
              <Button
                variant='primary'
                className='w-10 px-0 sm:w-auto sm:px-4'
                onClick={() => openModal('transactions-new')}
              >
                <PlusIcon className='size-4 sm:me-2' />
                <span className='hidden sm:inline'>Add new</span>
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
