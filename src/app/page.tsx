import { SnippetSection, Header } from '@/components';

export default function Home() {
  return (
    <div className='font-sans min-h-screen max-w-[1442px] w-full mx-auto flex flex-col'>
      {/* Header */}
      <Header />

      {/* Title */}
      <div className='text-light-text text-[2rem] font-bold px-8'>
        Newest Snippet
      </div>

      {/* Newest snippet */}
      <SnippetSection />
    </div>
  );
}
