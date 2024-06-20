'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { useSummary } from '@/hooks/summary';

import { ChartCard } from './chart-card';

export const DataCharts = () => {
  const { summary, summaryLoading } = useSummary();

  if (summaryLoading)
    return (
      <Card>
        <CardContent className='pt-6 text-sm text-muted-foreground'>
          {/* TEMPORARY! */}I am loading...
        </CardContent>
      </Card>
    );

  return (
    <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-6'>
      <ChartCard
        data={summary?.days}
        className='col-span-1 lg:col-span-3 xl:col-span-4'
      />
    </div>
  );
};
