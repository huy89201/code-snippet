'use client';
import React from 'react';
import axiosInstance from '@/lib/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import SnippetList from './SnippetList';
import Button from './Button';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 5;

async function fetchSnippets({
  page = 1,
  userId,
}: {
  page: number;
  userId: string | null;
}): Promise<GetSnippetRes> {
  const res = await axiosInstance.get('/api/snippet', {
    params: { page, page_size: PAGE_SIZE, user_id: userId },
  });

  return res.data as GetSnippetRes;
}

const SnippetSection = () => {
  // Hooks
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['SNIPPET_QUERY_KEY', PAGE_SIZE],
    queryFn: async ({ pageParam = 1 }) =>
      fetchSnippets({ page: pageParam, userId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  if (isLoading || isFetching)
    return (
      <div className='flex-1 w-max h-max mx-auto flex justify-center items-center text-3xl text-light-text font-medium text-center'>
        {t('title.loading')}
      </div>
    );

  const snippets = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className='flex flex-col gap-3'>
      <SnippetList data={snippets} />

      <div className='flex justify-center pb-2'>
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className='w-30'
        >
          {isFetchingNextPage ? t('title.loading') : t('button.loadMore')}
        </Button>
      </div>
    </div>
  );
};

export default SnippetSection;
