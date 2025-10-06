'use client';
import { SnippetSection, Header } from '@/components';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='font-sans min-h-screen max-w-[1442px] w-full mx-auto flex flex-col'>
      {/* Header */}
      <Header />

      {/* Title */}
      <div className='text-light-text text-[2rem] font-bold px-8'>
        {t('title.newestSnippet')}
      </div>

      {/* Newest snippet */}
      <SnippetSection />
    </div>
  );
}
