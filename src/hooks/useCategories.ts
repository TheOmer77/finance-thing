import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { InferResponseType, InferRequestType } from 'hono';

import { client } from '@/lib/hono';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const getQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await client.api.categories.$get();
      if (!res.ok) throw new Error('Failed to fetch categories.');

      const { data } = await res.json();
      return data;
    },
  });

  const createMutation = useMutation<
    InferResponseType<typeof client.api.categories.$post>,
    Error,
    InferRequestType<typeof client.api.categories.$post>['json']
  >({
    mutationFn: async json => {
      const res = await client.api.categories.$post({ json });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Category created.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => toast.error('Failed to create category.'),
  });

  const bulkDeleteMutation = useMutation<
    InferResponseType<(typeof client.api.categories)['bulk-delete']['$post']>,
    Error,
    InferRequestType<
      (typeof client.api.categories)['bulk-delete']['$post']
    >['json']
  >({
    mutationFn: async json => {
      const res = await client.api.categories['bulk-delete'].$post({ json });
      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success(
        `${data.length === 1 ? 'Category' : 'Categories'} deleted.`
      );
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // TODO: Also invalidate summary
    },
    onError: (_, { ids }) =>
      toast.error(
        `Failed to delete ${ids.length === 1 ? 'Category' : 'Categories'}.`
      ),
  });

  return {
    categories: getQuery.data,
    categoriesLoading: getQuery.isLoading,
    createCategory: createMutation.mutate,
    createCategoryPending: createMutation.isPending,
    deleteCategories: bulkDeleteMutation.mutate,
    deleteCategoriesPending: bulkDeleteMutation.isPending,
  };
};
