import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

import { logout } from '@/actions/auth';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Button from './Button';
import { GiHamburgerMenu } from 'react-icons/gi';
const SettingDropdown = () => {
  // Hooks
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const { data: session } = useSession();
  const { t } = useTranslation();

  // Helpers
  const handleLogOut = () => {
    // 1. Clear local/session storage
    localStorage.clear();
    sessionStorage.clear();

    // 2. Clear cookies (client-side)
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    logout();
  };

  return (
    <Menu>
      <MenuButton>
        <div className='text-light-text text-base font-medium'>
          <Button className='p-2 w-[2rem]'>
            <GiHamburgerMenu />
          </Button>
        </div>
      </MenuButton>
      <MenuItems
        anchor='bottom end'
        className='z-10 w-52 h-30 origin-top-right rounded-xl border border-bg-3 bg-bg-3 p-1 text-sm/6 text-light-text transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
      >
        <MenuItem>
          <Button className='group flex w-full items-center justify-start gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left bg-transparent'>
            {userId ? (
              <Link href='/'>{t('button.homePage')}</Link>
            ) : (
              <Link
                href={{
                  pathname: '/profile/',
                  query: { id: session?.user.id },
                }}
              >
                {t('button.profile')}
              </Link>
            )}
          </Button>
        </MenuItem>

        <MenuItem>
          <Button className='group flex w-full items-center justify-start gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left bg-transparent'>
            <Link href={'/snippet'}> {t('button.createSnippet')}</Link>
          </Button>
        </MenuItem>

        <MenuItem>
          <Button
            onClick={handleLogOut}
            className='group flex w-full items-center justify-start gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left bg-transparent'
          >
            {' '}
            {t('button.signout')}
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default SettingDropdown;
