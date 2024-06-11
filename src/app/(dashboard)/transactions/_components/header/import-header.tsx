import { useCallback } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { format, parse } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSelectAccount } from '@/hooks/accounts';
import { useTransactions, useTransactionsImport } from '@/hooks/transactions';
import type { insertTransactionSchema } from '@/db/schema';
import { amountToMilliunits } from '@/lib/amount';

import {
  FIELDS,
  INPUT_DATE_FORMAT,
  OUTPUT_DATE_FORMAT,
  REQUIRED_FIELDS,
} from '../table/constants';

export const TransactionsImportHeader = () => {
  const { importResult, selectedColumns, resetImport } =
      useTransactionsImport(),
    [headers, ...body] = importResult.data;
  const { bulkCreateTransactions, bulkCreateTransactionsPending } =
    useTransactions();

  const [SelectDialog, selectAccount] = useSelectAccount({
    message: 'Select an account for your imported transactions.',
  });

  const progress = Object.values(selectedColumns).filter(
      value =>
        value &&
        REQUIRED_FIELDS.includes(value as (typeof REQUIRED_FIELDS)[number])
    ).length,
    progressLeft = REQUIRED_FIELDS.length - progress,
    canContinueImport = progress >= REQUIRED_FIELDS.length;

  const getFormattedData = useCallback(() => {
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
      return formattedData as Pick<
        z.infer<typeof insertTransactionSchema>,
        'amount' | 'date' | 'payee' | 'notes'
      >[];
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('Something went wrong while parsing your imported data.');
    }
  }, [body, headers.length, selectedColumns]);

  const handleCancel = () => {
    window.history.back();
    resetImport();
  };

  const handleContinue = async () => {
    const formattedData = getFormattedData();
    if (!formattedData) return;
    const accountId = await selectAccount();
    if (!accountId) return;

    const dataToSubmit = formattedData.map(value => ({ ...value, accountId }));
    bulkCreateTransactions(dataToSubmit, { onSuccess: handleCancel });
  };

  return (
    <div className='flex flex-row items-center justify-between space-y-0'>
      <CardHeader>
        <CardTitle>Import transactions</CardTitle>

        <CardDescription>
          {canContinueImport
            ? 'All required fields are used.'
            : progressLeft === 1
              ? `${progressLeft} more field required.`
              : `${progressLeft} more fields required.`}
        </CardDescription>
      </CardHeader>
      <div className='flex flex-row items-center gap-2 pe-6 [&>*]:shrink-0'>
        <Button
          className='w-10 px-0 sm:w-auto sm:px-4'
          onClick={handleCancel}
          disabled={bulkCreateTransactionsPending}
        >
          <XIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Cancel</span>
        </Button>
        <Button
          variant='primary'
          className='w-10 px-0 sm:w-auto sm:px-4'
          onClick={handleContinue}
          disabled={!canContinueImport || bulkCreateTransactionsPending}
        >
          <CheckIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Continue</span>
        </Button>
      </div>

      <SelectDialog />
    </div>
  );
};
