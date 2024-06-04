import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

export const useCategoryById = (id?: string, { enabled = true } = {}) => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary
    },
    onError: () => toast.error('Failed to delete category.'),
  });

  const getQuery = useQuery({
    enabled:
      enabled &&
      !!id &&
      // Don't try to fetch after deletion, it will result in 404
      !deleteMutation.isPending &&
      !deleteMutation.isSuccess,
    queryKey: ['category', { id }],
    queryFn: async () => {
      const res = await client.api.categories[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch category.');

      const { data } = await res.json();
      return data;
    },
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
