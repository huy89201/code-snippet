'use client';
import React from 'react';
import { Header, SnippetSection } from '@/components';
import { redirect, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

function ProfilePage() {
  // Hooks
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  // States
  const userId = searchParams?.get('id');

  if (!userId) {
    redirect('/');
  }

  return (
    <div className='font-sans min-h-screen max-w-[1442px] w-full mx-auto flex flex-col'>
      {/* Header */}
      <Header />

      <div className='text-light-text text-[2rem] font-bold px-8'>
        {t('title.yourSnippet')}
      </div>

      <SnippetSection />
    </div>
  );
}

export default ProfilePage;
