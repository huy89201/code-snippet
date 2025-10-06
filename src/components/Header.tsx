'use client';
import React from 'react';
import Button from './Button';
import { logout } from '@/actions/auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LangDropdown from './LangDropdown';

const Header = () => {
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
    <div className='flex justify-between items-center p-3'>
      <div className='text-light-text text-[0.875rem] font-semibold'>
        {session?.user?.name}
      </div>

      <div className='flex gap-2'>
        <LangDropdown />

        {userId ? (
          <Button>
            <Link href='/'>{t('button.homePage')}</Link>
          </Button>
        ) : (
          <Button>
            <Link
              href={{
                pathname: '/profile/',
                query: { id: session?.user.id },
              }}
            >
              {t('button.profile')}
            </Link>
          </Button>
        )}

        <Button>
          <Link href={'/snippet'}> {t('button.createSnippet')}</Link>
        </Button>

        <Button onClick={handleLogOut}> {t('button.signout')}</Button>
      </div>
    </div>
  );
};

export default Header;
