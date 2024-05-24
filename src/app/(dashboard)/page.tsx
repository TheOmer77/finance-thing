'use client';

import { Button } from '@/components/ui/Button';
import { AccountDrawer } from '@/components/layout/modals/AccountDrawer';
import { useModal } from '@/hooks/useModal';

const DashboardPage = () => {
  const { openModal } = useModal();

  return (
    <>
      <Button onClick={() => openModal('accounts-new')}>Add an account</Button>
      <AccountDrawer />
    </>
  );
};

export default DashboardPage;
