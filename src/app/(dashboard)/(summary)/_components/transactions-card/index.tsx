import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSummary } from '@/hooks/summary';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/constants/api';

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

export const TransactionsChartCard = () => {
  const { summary } = useSummary();
  const [chartType, setChartType] = useState<TransactionsChartType>('area');

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
