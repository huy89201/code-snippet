import React from 'react';
import { Loading } from '@/components';
import { HomePage } from '@/ui';

export default function Home() {
  return (
    <React.Suspense fallback={<Loading />}>
      <HomePage />
    </React.Suspense>
  );
}
