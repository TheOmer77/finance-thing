'use client';

import { useSearchParams } from 'next/navigation';
import { cva, type VariantProps } from 'class-variance-authority';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useSummary } from '@/hooks/summary';
import {
  formatCurrency,
  formatDateRange,
  formatPercentage,
} from '@/lib/formatters';
import { cn } from '@/lib/utils';

import { CountUp } from './countup';

const boxVariants = cva('shrink-0 rounded-md size-12 grid place-items-center', {
  variants: {
    variant: {
      default: 'bg-primary/20 text-primary',
      danger: 'bg-destructive/20 text-destructive',
    },
  },
  defaultVariants: { variant: 'default' },
});

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
  <Card className='h-[11.5rem]'>
    <CardHeader className='flex flex-row items-center justify-between gap-2'>
      <div className='space-y-1.5'>
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-5 w-40 text-sm' />
      </div>
      <Skeleton className='size-12 shrink-0 rounded-md' />
    </CardHeader>
    <CardContent>
      <Skeleton className='mb-1 h-8 w-24 shrink-0' />
      <Skeleton className='h-5 w-40 shrink-0' />
    </CardContent>
  </Card>
);

export const DataCard = ({ title, type, variant }: DataCardProps) => {
  const searchParams = useSearchParams(),
    from = searchParams.get('from') || undefined,
    to = searchParams.get('to') || undefined;
  const dateRangeLabel = formatDateRange({ to, from });

  const { summary, summaryLoading } = useSummary();
  const value = summary?.[`${type}Amount`] || 0,
    percentageChange = summary?.[`${type}Change`] || 0,
    Icon = icons[type];

  if (summaryLoading) return <DataCardLoading />;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between gap-2'>
        <div className='space-y-1.5'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{dateRangeLabel}</CardDescription>
        </div>
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
            'line-clamp-1 text-sm font-medium text-muted-foreground',
            percentageChange > 0 && 'text-primary',
            percentageChange < 0 && 'text-destructive'
          )}
        >
          {percentageChange < 0
            ? `${formatPercentage(percentageChange)} less than last period`
            : `${formatPercentage(percentageChange)} more than last period`}
        </p>
      </CardContent>
    </Card>
  );
};
