import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { format, subDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { useSummary } from '@/hooks/summary';
import { DATE_FORMAT } from '@/constants/api';
import { FROM_SEARCH_PARAM, TO_SEARCH_PARAM } from '@/constants/searchParams';

export const DateFilter = () => {
  const { summaryLoading } = useSummary();

  const searchParams = useSearchParams(),
    [from, to] = [FROM_SEARCH_PARAM, TO_SEARCH_PARAM].map(key =>
      searchParams.get(key)
    );
  const pathname = usePathname();
  const router = useRouter();

  const defaultTo = new Date(),
    defaultFrom = subDays(defaultTo, 30);
  const pickerValue = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  } satisfies DateRange;

  const handleValueChange = (value?: DateRange) => {
    const newParams = new URLSearchParams(searchParams);

    if (!value) {
      newParams.delete(FROM_SEARCH_PARAM);
      newParams.delete(TO_SEARCH_PARAM);
    } else {
      if (value.from)
        newParams.set(FROM_SEARCH_PARAM, format(value.from, DATE_FORMAT));
      if (value.to)
        newParams.set(TO_SEARCH_PARAM, format(value.to, DATE_FORMAT));
    }

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <DateRangePicker
      value={pickerValue}
      onValueChange={handleValueChange}
      disabled={summaryLoading}
      className='h-9 w-auto rounded-md border-none bg-white/10 px-3 font-medium text-white transition-colors hover:bg-white/20 hover:text-white focus:ring-transparent'
    />
  );
};
