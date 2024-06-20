'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useSummary } from '@/hooks/summary';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { cn } from '@/lib/utils';

import { CountUp } from './countup';

const boxVariants = cva(
  'absolute end-4 top-2 grid size-12 shrink-0 place-items-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary/20 text-primary',
        danger: 'bg-destructive/20 text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

type DataCardProps = {
  title: string;
  type: 'income' | 'expenses' | 'remaining';
} & VariantProps<typeof boxVariants>;

const icons = {
  income: TrendingUpIcon,
  expenses: TrendingDownIcon,
  remaining: PiggyBankIcon,
};

const DataCardLoading = () => (
  <Card className='relative h-[8.375rem]'>
    <CardHeader className='pb-2'>
      <Skeleton className='h-6 w-24' />
      <Skeleton className='absolute end-4 top-2 size-12 shrink-0 rounded-md' />
    </CardHeader>
    <CardContent>
      <Skeleton className='mb-1 h-8 w-24 shrink-0' />
      <Skeleton className='h-5 w-40 shrink-0' />
    </CardContent>
  </Card>
);

export const DataCard = ({ title, type, variant }: DataCardProps) => {
  const { summary, summaryLoading } = useSummary();
  const value = summary?.[`${type}Amount`] || 0,
    percentageChange = summary?.[`${type}Change`] || 0,
    Icon = icons[type];

  if (summaryLoading) return <DataCardLoading />;

  return (
    <Card className='relative'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium tracking-normal'>
          {title}
        </CardTitle>
        <div className={cn(boxVariants({ variant }))}>
          <Icon className='size-6' />
        </div>
      </CardHeader>
      <CardContent>
        <CountUp
          preserveValue
          start={0}
          end={value}
          decimals={2}
          decimalPlaces={2}
          formattingFn={formatCurrency}
          className='mb-1 line-clamp-1 break-all text-2xl font-bold tracking-tight'
        />
        <p
          className={cn(
            'line-clamp-1 text-sm text-muted-foreground',
            percentageChange > 0 && 'text-primary',
            percentageChange < 0 && 'text-destructive'
          )}
        >
          {percentageChange < 0
            ? `${formatPercentage(Math.abs(percentageChange))} less than last period`
            : `${formatPercentage(Math.abs(percentageChange))} more than last period`}
        </p>
      </CardContent>
    </Card>
  );
};
