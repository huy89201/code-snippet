import React from 'react';
import { Loading } from '@/components';
import ProfilePage from '@/ui/ProfilePage';

function page() {
  return (
    <React.Suspense fallback={<Loading />}>
      <ProfilePage />
    </React.Suspense>
  );
}

export default page;
