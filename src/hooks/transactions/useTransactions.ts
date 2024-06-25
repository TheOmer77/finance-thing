import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferResponseType, InferRequestType } from 'hono';

import { client } from '@/lib/hono';
import {
  ACCOUNT_ID_SEARCH_PARAM,
  FROM_SEARCH_PARAM,
  TO_SEARCH_PARAM,
} from '@/constants/searchParams';

export const useTransactions = () => {
  const searchParams = useSearchParams();
  const [from, to, accountId] = [
    FROM_SEARCH_PARAM,
    TO_SEARCH_PARAM,
    ACCOUNT_ID_SEARCH_PARAM,
  ].map(key => searchParams.get(key) || '');

  const queryClient = useQueryClient();

  const getQuery = useQuery({
    // TODO: Check if params are needed in the key
    queryKey: ['transactions', { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transactions.$get({
        query: { from, to, accountId },
      });
      if (!res.ok) throw new Error('Failed to fetch transactions.');

      const { data } = await res.json();
      return data;
    },
  });

  const createMutation = useMutation<
    InferResponseType<typeof client.api.transactions.$post>,
    Error,
    InferRequestType<typeof client.api.transactions.$post>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.transactions.$post({ json });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Transaction created.');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => toast.error('Failed to create transaction.'),
  });

  const bulkCreateMutation = useMutation<
    InferResponseType<(typeof client.api.transactions)['bulk-create']['$post']>,
    Error,
    InferRequestType<
      (typeof client.api.transactions)['bulk-create']['$post']
    >['json']
  >({
    mutationFn: async json => {
      const res = await client.api.transactions['bulk-create'].$post({ json });
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success(
        `${data.length === 1 ? 'Transaction' : 'Transactions'} created.`
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
    },
    onError: (_, data) =>
      toast.error(
        `Failed to create ${data.length === 1 ? 'Transaction' : 'Transactions'}.`
      ),
  });

  const bulkDeleteMutation = useMutation<
    InferResponseType<(typeof client.api.transactions)['bulk-delete']['$post']>,
    Error,
    InferRequestType<
      (typeof client.api.transactions)['bulk-delete']['$post']
    >['json']
  >({
    mutationFn: async json => {
      const res = await client.api.transactions['bulk-delete'].$post({ json });
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success(
        `${data.length === 1 ? 'Transaction' : 'Transactions'} deleted.`
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
    },
    onError: (_, { ids }) =>
      toast.error(
        `Failed to delete ${ids.length === 1 ? 'Transaction' : 'Transactions'}.`
      ),
  });

  return {
    transactions: getQuery.data,
    transactionsLoading: getQuery.isLoading,
    createTransaction: createMutation.mutate,
    createTransactionPending: createMutation.isPending,
    bulkCreateTransactions: bulkCreateMutation.mutate,
    bulkCreateTransactionsPending: bulkCreateMutation.isPending,
    deleteTransactions: bulkDeleteMutation.mutate,
    deleteTransactionsPending: bulkDeleteMutation.isPending,
  };
};
