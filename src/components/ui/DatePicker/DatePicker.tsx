import type { DayPickerSingleProps } from 'react-day-picker';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

export type DatePickerProps = Omit<
  DayPickerSingleProps,
  'disabled' | 'initialFocus' | 'mode' | 'onSelect' | 'selected'
> & {
  value?: DayPickerSingleProps['selected'];
  onValueChange?: DayPickerSingleProps['onSelect'];
  disabled?: boolean;
};

export const DatePicker = ({
  value,
  onValueChange,
  disabled,
  ...props
}: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant='outline'
        className={cn(
          'w-full justify-start text-start font-normal',
          !value && 'text-muted-foreground'
        )}
        disabled={disabled}
      >
        <CalendarIcon className='mr-2 size-4' />
        {value ? format(value, 'PPP') : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className='w-auto p-0'>
      <Calendar
        {...props}
        mode='single'
        initialFocus
        selected={value}
        onSelect={onValueChange}
        disabled={disabled}
      />
    </PopoverContent>
  </Popover>
);
