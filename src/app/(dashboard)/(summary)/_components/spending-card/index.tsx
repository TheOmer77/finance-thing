import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSummary } from '@/hooks/summary';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/constants/api';

import { PieChart } from './pie-chart';
import { RadialChart } from './radial-chart';
import { RadarChart } from './radar-chart';
import { ChartTypeSelect } from './chart-type-select';
import type { SpendingCategoriesData, SpendingChartType } from './types';

type ChartCardContentProps = {
  data?: MaybeError<SpendingCategoriesData>;
  type: SpendingChartType;
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
    case 'pie':
      return <PieChart data={data} />;
    case 'radar':
      return <RadarChart data={data} />;
    case 'radial':
      return <RadialChart data={data} />;
  }
};

export const SpendingPieCard = () => {
  const { summary } = useSummary();
  const [chartType, setChartType] = useState<SpendingChartType>('pie');

  return (
    <Card className='col-span-1 lg:col-span-3 xl:col-span-2'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='line-clamp-1 overflow-visible'>
          Categories
        </CardTitle>
        <ChartTypeSelect value={chartType} onValueChange={setChartType} />
      </CardHeader>
      <CardContent>
        <ChartCardContent data={summary?.categories} type={chartType} />
      </CardContent>
    </Card>
  );
};
