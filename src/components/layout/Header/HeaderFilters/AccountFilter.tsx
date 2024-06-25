import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useAccounts } from '@/hooks/accounts';
import { useSummary } from '@/hooks/summary';
import { ACCOUNT_ID_SEARCH_PARAM } from '@/constants/searchParams';

const ALL_ACCOUNTS_VALUE = 'all';

export const AccountFilter = () => {
  const { accounts, accountsLoading } = useAccounts();
  const { summaryLoading } = useSummary();

  const searchParams = useSearchParams(),
    accountId = searchParams.get(ACCOUNT_ID_SEARCH_PARAM) || ALL_ACCOUNTS_VALUE;
  const pathname = usePathname();
  const router = useRouter();

  const handleValueChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === ALL_ACCOUNTS_VALUE) newParams.delete(ACCOUNT_ID_SEARCH_PARAM);
    else newParams.set(ACCOUNT_ID_SEARCH_PARAM, value);

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Select
      value={accountId}
      onValueChange={handleValueChange}
      disabled={accountsLoading || summaryLoading}
    >
      <SelectTrigger className='h-9 w-auto rounded-md border-none bg-white/10 px-3 font-medium text-white transition-colors hover:bg-white/20 focus:ring-transparent'>
        <SelectValue placeholder='Account' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_ACCOUNTS_VALUE}>All accounts</SelectItem>
        {accounts?.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
