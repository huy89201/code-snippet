'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className='flex-1 w-max h-max mx-auto flex justify-center items-center text-3xl text-light-text font-medium text-center'>
      {t('title.loading')}
    </div>
  );
};

export default Loading;
