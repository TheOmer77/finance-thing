import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

export const useTransactionById = (id?: string) => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    enabled: !!id,
    queryKey: ['transaction', { id }],
    queryFn: async () => {
      const res = await client.api.transactions[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch transaction.');

      const { data } = await res.json();
      return data;
    },
  });

  const updateMutation = useMutation<
    InferResponseType<(typeof client.api.transactions)[':id']['$patch']>,
    Error,
    InferRequestType<(typeof client.api.transactions)[':id']['$patch']>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.transactions[':id'].$patch({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Transaction updated.');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      // TODO: Invalidate summary
    },
    onError: () => toast.error('Failed to update transaction.'),
  });

  const deleteMutation = useMutation<
    InferResponseType<(typeof client.api.transactions)[':id']['$delete']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.transactions[':id'].$delete({
        param: { id },
      });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Transaction deleted.');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      // TODO: Invalidate summary
    },
    onError: () => toast.error('Failed to delete transaction.'),
  });

  return {
    transaction: getQuery.data,
    transactionFetching: getQuery.isFetching,
    updateTransaction: updateMutation.mutate,
    updateTransactionPending: updateMutation.isPending,
    deleteTransaction: deleteMutation.mutate,
    deleteTransactionPending: deleteMutation.isPending,
  };
};
