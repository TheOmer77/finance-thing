import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

export const useAccountById = (id?: string) => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    enabled: !!id,
    queryKey: ['account', { id }],
    queryFn: async () => {
      const res = await client.api.accounts[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch account.');

      const { data } = await res.json();
      return data;
    },
  });

  const updateMutation = useMutation<
    InferResponseType<(typeof client.api.accounts)[':id']['$patch']>,
    Error,
    InferRequestType<(typeof client.api.accounts)[':id']['$patch']>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.accounts[':id'].$patch({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Account updated.');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => toast.error('Failed to update account.'),
  });

  return {
    account: getQuery.data,
    accountFetching: getQuery.isFetching,
    updateAccount: updateMutation.mutate,
    updateAccountPending: updateMutation.isPending,
  };
};
