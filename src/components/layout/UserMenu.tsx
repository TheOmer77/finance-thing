'use client';

import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Loader2Icon } from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export const UserMenu = () => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='ms-auto rounded-full p-2'
          disabled={!isLoaded}
        >
          {!isLoaded || !user?.id ? (
            <Loader2Icon className='size-7 animate-spin' />
          ) : (
            <Avatar className='size-9'>
              <AvatarImage
                alt={user?.primaryEmailAddress?.emailAddress || 'User'}
                src={user?.imageUrl}
              />
              <AvatarFallback>
                {
                  (user?.username
                    ? user.username
                    : user?.primaryEmailAddress?.emailAddress)?.[0]
                }
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => openUserProfile()}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
