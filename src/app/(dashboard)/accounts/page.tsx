import { AccountDrawer } from '@/components/layout/modals/AccountDrawer';

import { AccountsTable } from './table';
import { AccountsHeader } from './header';

const AccountsPage = () => (
  <>
    <AccountsHeader />
    <AccountsTable />
    <AccountDrawer />
  </>
);

export default AccountsPage;
