import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { amountFromMilliunits } from '@/lib/amount';
import { isErrorObj } from '@/lib/isErrorObj';

export const useSummary = () => {
  const searchParams = useSearchParams();
  const [from, to, accountId] = ['from', 'to', 'accountId'].map(
    key => searchParams.get(key) || ''
  );

  const getQuery = useQuery({
    // TODO: Check if params are needed in the key
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.summary.$get({
        query: { from, to, accountId },
      });
      if (!res.ok) throw new Error('Failed to fetch summary.');

      const { data } = await res.json();
      return {
        ...data,
        incomeAmount: amountFromMilliunits(data.incomeAmount),
        expensesAmount: amountFromMilliunits(data.expensesAmount),
        remainingAmount: amountFromMilliunits(data.remainingAmount),

        categories: isErrorObj(data.categories)
          ? data.categories
          : data.categories.map(({ name, value }) => ({
              name,
              value: amountFromMilliunits(value),
            })),
        days: isErrorObj(data.days)
          ? data.days
          : data.days.map(({ date, income, expenses }) => ({
              date,
              income: amountFromMilliunits(income),
              expenses: amountFromMilliunits(expenses),
            })),
      };
    },
  });

  return {
    summary: getQuery.data,
    summaryLoading: getQuery.isLoading,
  };
};
