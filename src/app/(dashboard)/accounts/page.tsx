import { Card } from '@/components/ui/Card';

import { AccountDrawer } from './_components/drawer';
import { AccountsHeader } from './_components/header';
import { AccountsTable } from './_components/table';

const AccountsPage = () => (
  <Card>
    <AccountsHeader />
    <AccountsTable />
    <AccountDrawer />
  </Card>
);

export default AccountsPage;
