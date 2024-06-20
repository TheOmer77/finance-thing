import { useState, type ComponentPropsWithoutRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/constants/api';

import { AreaChart } from './charts/area-chart';
import { BarChart } from './charts/bar-chart';
import { LineChart } from './charts/line-chart';
import { ChartTypeSelect } from './charts/chart-type-select';
import type { ChartData, ChartType } from './charts/types';

type ChartProps = ComponentPropsWithoutRef<'div'> & {
  data?: MaybeError<ChartData>;
};
type ChartCardContentProps = {
  data?: MaybeError<ChartData>;
  type: ChartType;
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

export const ChartCard = ({ data, ...props }: ChartProps) => {
  const [chartType, setChartType] = useState<ChartType>('area');

  return (
    <Card {...props}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='line-clamp-1'>Transactions</CardTitle>
        <ChartTypeSelect value={chartType} onValueChange={setChartType} />
      </CardHeader>
      <CardContent>
        <ChartCardContent data={data} type={chartType} />
      </CardContent>
    </Card>
  );
};
