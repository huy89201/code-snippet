'use client';
import { Header, SnippetSection } from '@/components';
import { redirect } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { t } = useTranslation();

  const profileId = searchParams?.id;

  if (!profileId) {
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

export default page;
