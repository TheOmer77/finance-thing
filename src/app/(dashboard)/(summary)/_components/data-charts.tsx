'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useSummary } from '@/hooks/summary';

import { TransactionsChartCard } from './transactions-card';
import { SpendingPieCard } from './spending-card';

export const DataCharts = () => {
  const { summaryLoading } = useSummary();

  if (summaryLoading)
    return (
      <Card>
        <CardContent className='pt-6 text-sm text-muted-foreground'>
          {/* TEMPORARY! */}
          <Spinner />
        </CardContent>
      </Card>
    );

  return (
    <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-6'>
      <TransactionsChartCard />
      <SpendingPieCard />
    </div>
  );
};
