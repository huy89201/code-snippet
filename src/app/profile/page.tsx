import { Header, SnippetSection } from '@/components';
import React from 'react';

function page() {
  return (
    <div className='font-sans min-h-screen max-w-[1442px] w-full mx-auto'>
      {/* Header */}
      <Header />

      <div className='text-light-text text-[2rem] font-bold px-8'>
        Your snippet
      </div>

      <SnippetSection />
    </div>
  );
}

export default page;
