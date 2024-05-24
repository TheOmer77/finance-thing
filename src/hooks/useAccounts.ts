import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferResponseType, InferRequestType } from 'hono';

import { client } from '@/lib/hono';

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const getAccountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await client.api.accounts.$get();
      if (!res.ok) throw new Error('Failed to fetch accounts');

      const { data } = await res.json();
      return data;
    },
  });

  const createAccountMutation = useMutation<
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

  return {
    accounts: getAccountsQuery.data,
    accountsLoading: getAccountsQuery.isLoading,
    createAccount: createAccountMutation.mutate,
    createAccountPending: createAccountMutation.isPending,
  };
};
