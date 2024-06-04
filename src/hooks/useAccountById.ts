import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

export const useAccountById = (id?: string, { enabled = true } = {}) => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
    },
    onError: () => toast.error('Failed to update account.'),
  });

  const deleteMutation = useMutation<
    InferResponseType<(typeof client.api.accounts)[':id']['$delete']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.accounts[':id'].$delete({ param: { id } });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Account deleted.');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
    },
    onError: () => toast.error('Failed to delete account.'),
  });

  const getQuery = useQuery({
    enabled:
      enabled &&
      !!id &&
      // Don't try to fetch after deletion, it will result in 404
      !deleteMutation.isPending &&
      !deleteMutation.isSuccess,
    queryKey: ['account', { id }],
    queryFn: async () => {
      const res = await client.api.accounts[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch account.');

      const { data } = await res.json();
      return data;
    },
  });

  return {
    account: getQuery.data,
    accountFetching: getQuery.isFetching,
    updateAccount: updateMutation.mutate,
    updateAccountPending: updateMutation.isPending,
    deleteAccount: deleteMutation.mutate,
    deleteAccountPending: deleteMutation.isPending,
  };
};
