'use client';

import { useState } from 'react';
import { FileSearchIcon, OctagonAlertIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/layout/EmptyState';
import { useSummary } from '@/hooks/summary';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/types/api';

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
  if (!data || isErrorObj(data) || data.length < 1) {
    let errorText;
    switch (true) {
      case !data:
        errorText = 'Data is missing.';
        break;
      case Array.isArray(data) && data.length < 1:
        errorText = 'No data for this period.';
        break;
      default:
        errorText = 'Something went wrong.';
    }

    const ErrorIcon = Array.isArray(data) ? FileSearchIcon : OctagonAlertIcon;
    return (
      <EmptyState text={errorText} icon={<ErrorIcon />} className='h-[22rem]' />
    );
  }

  switch (type) {
    case 'pie':
      return <PieChart data={data} />;
    case 'radar':
      return <RadarChart data={data} />;
    case 'radial':
      return <RadialChart data={data} />;
  }
};

const SpendingChartCardLoading = () => (
  <Card className='col-span-1 lg:col-span-3 xl:col-span-2'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
      <Skeleton className='h-8 w-32' />
      <Skeleton className='h-10 w-[4.625rem] sm:w-[8.75rem]' />
    </CardHeader>
    <CardContent className='grid h-[22rem] place-items-center'>
      <Spinner />
    </CardContent>
  </Card>
);

export const SpendingChartCard = () => {
  const { summary, summaryLoading } = useSummary();
  const [chartType, setChartType] = useState<SpendingChartType>('pie');

  if (summaryLoading) return <SpendingChartCardLoading />;
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
