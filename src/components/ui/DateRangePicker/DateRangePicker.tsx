'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { Calendar as CalendarIcon, ChevronDownIcon } from 'lucide-react';
import type { DayPickerRangeProps } from 'react-day-picker';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { formatDateRange } from '@/lib/formatters';
import { cn } from '@/lib/utils';

export type DateRangePickerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'value' | 'onChange'
> & {
  value?: DayPickerRangeProps['selected'];
  onValueChange?: DayPickerRangeProps['onSelect'];
};

export const DateRangePicker = ({
  value,
  onValueChange,
  className,
  disabled,
  ...props
}: DateRangePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        id='date'
        variant='outline'
        className={cn(
          'w-full justify-start text-start font-normal',
          !value && 'text-muted-foreground',
          className
        )}
        disabled={disabled}
        {...props}
      >
        <CalendarIcon className='mr-2 size-4' />
        <span>{value ? formatDateRange(value) : 'Pick a date range'}</span>
        <ChevronDownIcon className='ms-2 size-4 opacity-50' />
      </Button>
    </PopoverTrigger>
    <PopoverContent className='w-auto p-0' align='start'>
      <Calendar
        mode='range'
        initialFocus
        defaultMonth={value?.from}
        selected={value}
        onSelect={onValueChange}
        numberOfMonths={2}
        disabled={disabled}
      />
    </PopoverContent>
  </Popover>
);
