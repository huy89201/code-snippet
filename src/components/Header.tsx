'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import LangDropdown from './LangDropdown';
import SettingDropdown from './SettingDropdown';

const Header = () => {
  // Hooks
  const { data: session } = useSession();

  return (
    <div className='flex justify-between items-center p-3'>
      <div className='text-light-text text-[0.875rem] font-semibold'>
        {session?.user?.name}
      </div>

      <div className='flex gap-2'>
        <LangDropdown />

        <SettingDropdown />
      </div>
    </div>
  );
};

export default Header;
