import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferResponseType, InferRequestType } from 'hono';

import { client } from '@/lib/hono';

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await client.api.accounts.$get();
      if (!res.ok) throw new Error('Failed to fetch accounts');

      const { data } = await res.json();
      return data;
    },
  });

  const createMutation = useMutation<
    InferResponseType<typeof client.api.accounts.$post>,
    Error,
    InferRequestType<typeof client.api.accounts.$post>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.accounts.$post({ json });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Account created.');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: () => toast.error('Failed to create account.'),
  });

  const bulkDeleteMutation = useMutation<
    InferResponseType<(typeof client.api.accounts)['bulk-delete']['$post']>,
    Error,
    InferRequestType<
      (typeof client.api.accounts)['bulk-delete']['$post']
    >['json']
  >({
    mutationFn: async json => {
      const res = await client.api.accounts['bulk-delete'].$post({ json });
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.length === 1 ? 'Account' : 'Accounts'} deleted.`);
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: Also invalidate summary
    },
    onError: (_, { ids }) =>
      toast.error(
        `Failed to delete ${ids.length === 1 ? 'Account' : 'Accounts'}.`
      ),
  });

  return {
    accounts: getQuery.data,
    accountsLoading: getQuery.isLoading,
    createAccount: createMutation.mutate,
    createAccountPending: createMutation.isPending,
    deleteAccounts: bulkDeleteMutation.mutate,
    deleteAccountsPending: bulkDeleteMutation.isPending,
  };
};
