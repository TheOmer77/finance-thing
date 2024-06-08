'use client';

import { useSearchParams } from 'next/navigation';
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react';
import type { ParseResult } from 'papaparse';
import { format, parse } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useModal } from '@/hooks/useModal';
import { useTransactions, useTransactionsImport } from '@/hooks/transactions';
import { amountToMilliunits } from '@/lib/amount';

import { UploadButton } from './upload-button';
import {
  FIELDS,
  INPUT_DATE_FORMAT,
  OUTPUT_DATE_FORMAT,
  REQUIRED_FIELDS,
} from '../table/constants';

export const TransactionsHeader = () => {
  const { transactionsLoading } = useTransactions();
  const { importResult, setImportResult, selectedColumns, resetImport } =
      useTransactionsImport(),
    [headers, ...body] = importResult.data;

  const searchParams = useSearchParams(),
    isImportMode = !!searchParams.get('import') && importResult.data.length > 0;
  const { openModal } = useModal();

  const progress = Object.values(selectedColumns).filter(
      value =>
        value &&
        REQUIRED_FIELDS.includes(value as (typeof REQUIRED_FIELDS)[number])
    ).length,
    progressLeft = REQUIRED_FIELDS.length - progress,
    canContinueImport = progress >= REQUIRED_FIELDS.length;

  const handleUpload = (result: ParseResult<string[]>) => {
    window.history.pushState(null, '', `?import=true`);
    setImportResult(result);
  };

  const handleImportContinue = () => {
    const mappedData = {
      headers: [...Array(headers.length).keys()].map(
        index => selectedColumns[`column-${index}`] || null
      ),
      body: body
        .map(row => {
          const transformedRow = row.map((cell, index) =>
            selectedColumns[`column-${index}`] ? cell : null
          );
          return transformedRow.every(item => item === null)
            ? []
            : transformedRow;
        })
        .filter(row => row.length > 0),
    };

    try {
      const formattedData = mappedData.body.map(row =>
        row.reduce((obj, value, index) => {
          const header = mappedData.headers[index] as
            | (typeof FIELDS)[number]
            | null;
          if (header === null || value === null) return obj;

          switch (header) {
            case 'amount': {
              const formattedValue = amountToMilliunits(Number(value));
              if (isNaN(formattedValue))
                throw new Error(
                  'The column selected for amount contains an invalid number.'
                );
              return { ...obj, [header]: formattedValue };
            }
            case 'date': {
              try {
                const formattedValue = format(
                  parse(value, INPUT_DATE_FORMAT, new Date()),
                  OUTPUT_DATE_FORMAT
                );
                return { ...obj, [header]: formattedValue };
              } catch (error) {
                throw new Error(
                  `The column selected for date contains an invalid date, or
it's in an incorrect format.`
                );
              }
            }
            default:
              return { ...obj, [header]: value };
          }
        }, {})
      );

      console.log(formattedData);
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      toast.error('Something went wrong while parsing your imported data.');
    }
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
                onClick={handleImportContinue}
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
