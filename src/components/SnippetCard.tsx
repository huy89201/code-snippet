'use client';
import React, { Fragment, useState } from 'react';
import moment from 'moment';
import Button from './Button';
import { Editor } from '@monaco-editor/react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axiosInstance from '@/lib/axios';
import { useQueryClient } from '@tanstack/react-query';
import { FaShare } from 'react-icons/fa';
import ShareSnippetDialog from './ShareSnippetDialog';

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  // Hooks
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // States
  const [sharePath, setSharePath] = useState<string>();

  const userId = searchParams.get('id');
  const isCurrentUserSnippet =
    userId === snippet.user_id || session?.user.id === snippet.user_id;

  // Helpers
  const handleDeleteSnippet = async (id: string) => {
    try {
      await axiosInstance.delete('/api/snippet', {
        params: {
          snippet_id: id,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['SNIPPET_QUERY_KEY'] });
    } catch (error) {}
  };

  const handleShareSnippet = () => {
    const host = window.location.host;
    const path = `${host}/snippet?id=${snippet._id}`;

    setSharePath(path);
  };

  return (
    <div className='flex flex-col gap-3.5'>
      {/* Thumbnail */}
      <div className='h-[30rem] lg:h-[13.875rem] rounded-lg bg-bg-3 overflow-hidden'>
        <Editor
          width='100%'
          height='100%'
          value={snippet.snippet}
          theme='vs-dark'
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
          }}
        />
      </div>

      {/* Content */}
      <div className=''>
        {/* Tags */}
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <Button className='rounded-[1.5rem] px-4 py-2.5'>
              #{snippet.langue}
            </Button>
            <Button className='rounded-[1.5rem] px-4 py-2.5'>
              #{snippet.tag_name}
            </Button>
          </div>

          <div className='flex gap-2'>
            <button className='cursor-pointer' onClick={handleShareSnippet}>
              <FaShare />
            </button>

            {isCurrentUserSnippet && (
              <Fragment>
                <Link
                  href={{
                    pathname: '/snippet',
                    query: { id: snippet._id },
                  }}
                >
                  <MdModeEdit className='' />
                </Link>

                <button
                  className='cursor-pointer'
                  onClick={() => handleDeleteSnippet(snippet._id)}
                >
                  <MdDelete />
                </button>
              </Fragment>
            )}
          </div>
        </div>

        <div className='flex justify-between mt-2'>
          <div className='text-light-text text-[1.25rem] font-semibold'>
            {snippet.user_name}
          </div>
          <div className='text-light-gray-2 text-base font-medium'>
            {`${moment(snippet.timestamp).fromNow()}`}
          </div>
        </div>
      </div>

      <ShareSnippetDialog
        isOpen={!!sharePath}
        close={() => setSharePath(undefined)}
        path={sharePath}
      />
    </div>
  );
};

export default SnippetCard;
