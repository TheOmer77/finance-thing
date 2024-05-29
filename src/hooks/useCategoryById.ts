import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

export const useCategoryById = (id?: string) => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    enabled: !!id,
    queryKey: ['category', { id }],
    queryFn: async () => {
      const res = await client.api.categories[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch category.');

      const { data } = await res.json();
      return data;
    },
  });

  const updateMutation = useMutation<
    InferResponseType<(typeof client.api.categories)[':id']['$patch']>,
    Error,
    InferRequestType<(typeof client.api.categories)[':id']['$patch']>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.categories[':id'].$patch({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Category updated.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => toast.error('Failed to update category.'),
  });

  const deleteMutation = useMutation<
    InferResponseType<(typeof client.api.categories)[':id']['$delete']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.categories[':id'].$delete({ param: { id } });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Category deleted.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => toast.error('Failed to delete category.'),
  });

  return {
    category: getQuery.data,
    categoryFetching: getQuery.isFetching,
    updateCategory: updateMutation.mutate,
    updateCategoryPending: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    deleteCategoryPending: deleteMutation.isPending,
  };
};
