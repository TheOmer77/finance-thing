'use client';

import { usePathname } from 'next/navigation';

import { AccountFilter } from './AccountFilter';
import { DateFilter } from './DateFilter';

const VISIBLE_PATHNAMES = ['/', '/transactions'];

export const HeaderFilters = () => {
  const pathname = usePathname();
  if (!VISIBLE_PATHNAMES.includes(pathname)) return null;

  return (
    <div className='flex flex-row flex-wrap items-center gap-2 [header:has(&)+*]:-mt-10 lg:[header:has(&)+*]:-mt-16'>
      <AccountFilter />
      <DateFilter />
    </div>
  );
};
