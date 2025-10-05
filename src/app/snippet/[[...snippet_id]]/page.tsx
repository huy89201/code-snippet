'use client';
import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, LangueDropdown } from '@/components';
import TagDropdown from '@/components/TagDropdown';
import { Tag } from '@/types/tag';
import { useSession } from 'next-auth/react';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';

const DEFAULT_LANGUE = 'javascript';

function page() {
  // Hooks
  const { data: session } = useSession();

  // States
  const [value, setValue] = React.useState<Partial<SnippetPayload> | undefined>(
    {
      timestamp: new Date().getTime(),
      langue: DEFAULT_LANGUE,
    }
  );

  // Helpers
  const handleSelectLang = (value: string) => {
    setValue((prev) => ({ ...prev, langue: value }));
  };

  const handleSelectTag = (value: Tag) => {
    setValue((prev) => ({ ...prev, tag_id: value._id, tag_name: value.name }));
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post('/api/snippet', {
        ...value,
        user_id: session?.user.id,
        user_name: session?.user.name,
      });
    } catch (error) {}
  };

  return (
    <div className='flex flex-col gap-4 w-screen h-screen p-3'>
      <div className='flex-[0] flex justify-between'>
        <LangueDropdown
          onclick={handleSelectLang}
          defaultValue={DEFAULT_LANGUE}
        />

        <TagDropdown onclick={handleSelectTag} />
      </div>

      <div className='flex-1'>
        <Editor
          width='100%'
          height='100%'
          language={value?.langue}
          theme='vs-dark'
          onChange={(value) =>
            setValue((prev) => ({ ...prev, snippet: value }))
          }
        />
      </div>

      <div className='action flex-[0] flex gap-4 justify-end'>
        <Button type='button'>
          <Link href='/'>Back</Link>
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

export default page;
