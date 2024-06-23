'use client';

import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import { useSummary } from '@/hooks/summary';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/types/api';

import { AreaChart } from './area-chart';
import { BarChart } from './bar-chart';
import { LineChart } from './line-chart';
import { ChartTypeSelect } from './chart-type-select';
import type { TransactionsDaysData, TransactionsChartType } from './types';

type ChartCardContentProps = {
  data?: MaybeError<TransactionsDaysData>;
  type: TransactionsChartType;
};

const ChartCardContent = ({ data, type }: ChartCardContentProps) => {
  if (!data)
    return (
      <span className='text-sm text-muted-foreground'>Data is missing.</span>
    );
  if (isErrorObj(data))
    return (
      <span className='text-sm text-muted-foreground'>
        Something went wrong.
      </span>
    );
  if (data.length < 1)
    return (
      <span className='text-sm text-muted-foreground'>
        No data for this period.
      </span>
    );

  switch (type) {
    case 'area':
      return <AreaChart data={data} />;
    case 'bar':
      return <BarChart data={data} />;
    case 'line':
      return <LineChart data={data} />;
  }
};

const TransactionsChartCardLoading = () => (
  <Card className='col-span-1 lg:col-span-3 xl:col-span-4'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      <Skeleton className='h-8 w-36' />
      <Skeleton className='h-10 w-[4.625rem] sm:w-[9.5rem]' />
    </CardHeader>
    <CardContent className='grid h-[22rem] place-items-center'>
      <Spinner />
    </CardContent>
  </Card>
);

export const TransactionsChartCard = () => {
  const { summary, summaryLoading } = useSummary();
  const [chartType, setChartType] = useState<TransactionsChartType>('area');

  if (summaryLoading) return <TransactionsChartCardLoading />;
  return (
    <Card className='col-span-1 lg:col-span-3 xl:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='line-clamp-1 overflow-visible'>
          Transactions
        </CardTitle>
        <ChartTypeSelect value={chartType} onValueChange={setChartType} />
      </CardHeader>
      <CardContent>
        <ChartCardContent data={summary?.days} type={chartType} />
      </CardContent>
    </Card>
  );
};
