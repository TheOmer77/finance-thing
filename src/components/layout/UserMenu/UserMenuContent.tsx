'use client';

import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';

export const UserMenuContent = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenuContent align='end'>
      <DropdownMenuLabel className='pb-0'>{user?.fullName}</DropdownMenuLabel>
      <DropdownMenuLabel className='pt-0 text-xs font-normal text-muted-foreground'>
        {user?.primaryEmailAddress?.emailAddress}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => openUserProfile()}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
