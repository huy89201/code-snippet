'use client';
import React from 'react';
import Button from './Button';
import { logout } from '@/actions/auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className='flex justify-between items-center p-3'>
      <div className='text-light-text text-[0.875rem] font-semibold'>
        {session?.user?.name}
      </div>

      <div className='flex gap-2'>
        <Button>
          <Link href={'/snippet'}>Create snippet</Link>
        </Button>

        <Button onClick={() => logout()}>Signout</Button>
      </div>
    </div>
  );
};

export default Header;
