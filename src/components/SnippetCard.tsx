import React from 'react';
import moment from 'moment';
import Button from './Button';
import { Editor } from '@monaco-editor/react';

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  return (
    <div className='flex flex-col gap-3.5'>
      {/* Thumbnail */}
      <div className='h-[13.875rem] rounded-lg bg-bg-3 overflow-hidden'>
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
        <div className='flex gap-4'>
          <Button className='rounded-[1.5rem] px-4 py-2.5'>
            #{snippet.langue}
          </Button>
          <Button className='rounded-[1.5rem] px-4 py-2.5'>
            #{snippet.tag_name}
          </Button>
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
    </div>
  );
};

export default SnippetCard;
