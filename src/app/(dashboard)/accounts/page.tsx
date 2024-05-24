import { Card } from '@/components/ui/Card';
import { AccountDrawer } from '@/components/layout/modals/AccountDrawer';

import { AccountsTable } from './table';
import { AccountsHeader } from './header';

const AccountsPage = () => {
  return (
    <>
      <Card>
        <AccountsHeader />
        <AccountsTable />
      </Card>
      <AccountDrawer />
    </>
  );
};

export default AccountsPage;
