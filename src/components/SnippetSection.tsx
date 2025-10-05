'use client';
import React from 'react';
import axiosInstance from '@/lib/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import SnippetList from './SnippetList';
import Button from './Button';

const PAGE_SIZE = 5;

async function fetchSnippets(page = 1): Promise<GetSnippetRes> {
  const res = await axiosInstance.get('/api/snippet', {
    params: { page, page_size: PAGE_SIZE },
  });

  return res.data as GetSnippetRes;
}

const SnippetSection = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['SNIPPET_QUERY_KEY', PAGE_SIZE],
      queryFn: async ({ pageParam = 1 }) => fetchSnippets(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  if (isLoading) return <div className=''>Loading...</div>;

  const snippets = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className='flex flex-col gap-3'>
      <SnippetList data={snippets} />

      <div className='flex justify-center'>
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className='w-30'
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </Button>
      </div>
    </div>
  );
};

export default SnippetSection;
