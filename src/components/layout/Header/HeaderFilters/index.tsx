import { AccountFilter } from './AccountFilter';

export const HeaderFilters = () => {
  // TODO: Only show in summary & transactions pages
  return (
    <div className='flex flex-row flex-wrap items-center gap-2'>
      <AccountFilter />
    </div>
  );
};
