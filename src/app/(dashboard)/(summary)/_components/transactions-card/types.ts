import type { InferResponseType } from 'hono';

import type { client } from '@/lib/hono';
import type { NotError } from '@/types/api';

export type TransactionsDaysData = NotError<
  InferResponseType<typeof client.api.summary.$get>['data']['days']
>;
export type TransactionsChartProps = { data: TransactionsDaysData };

export type TransactionsChartType = 'area' | 'bar' | 'line';
