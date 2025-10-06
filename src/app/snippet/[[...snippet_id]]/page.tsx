'use client';
import React from 'react';
import axiosInstance from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SnippetForm } from '../../../components/SnippetForm';

async function fetchSnippetsDetails({
  snippetId,
}: {
  snippetId: string | null;
}): Promise<Snippet> {
  const res = await axiosInstance.get('/api/snippet', {
    params: { snippet_id: snippetId },
  });

  return res.data as Snippet;
}

function page() {
  // Hooks
  const searchParams = useSearchParams();
  const snippetId = searchParams.get('id');

  const {
    data: defaultValues,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['SNIPPET_QUERY_KEY'],
    queryFn: async () => fetchSnippetsDetails({ snippetId }),
  });

  if (isLoading || isFetching)
    return (
      <div className='w-screen h-screen flex justify-center items-center text-3xl text-light-text font-medium text-center'>
        Loading...
      </div>
    );

  return <SnippetForm defaultValues={defaultValues} />;
}

export default page;
