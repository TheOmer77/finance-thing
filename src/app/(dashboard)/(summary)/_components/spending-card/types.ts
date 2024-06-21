import type { InferResponseType } from 'hono';

import type { client } from '@/lib/hono';
import type { NotError } from '@/constants/api';

export type SpendingCategoriesData = NotError<
  InferResponseType<typeof client.api.summary.$get>['data']['categories']
>;
export type SpendingChartProps = { data: SpendingCategoriesData };

export type SpendingChartType = 'pie' | 'radar' | 'radial';
