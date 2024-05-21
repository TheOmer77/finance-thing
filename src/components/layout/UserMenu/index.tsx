'use client';

import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { UserMenuTrigger } from './UserMenuTrigger';
import { UserMenuContent } from './UserMenuContent';

export const UserMenu = () => (
  <DropdownMenu>
    <UserMenuTrigger />
    <UserMenuContent />
  </DropdownMenu>
);
