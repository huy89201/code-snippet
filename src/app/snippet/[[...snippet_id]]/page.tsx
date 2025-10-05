'use client';
import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, LangueDropdown } from '@/components';
import TagDropdown from '@/components/TagDropdown';
import { useSession } from 'next-auth/react';
import axiosInstance from '@/lib/axios';
import { useForm, FormProvider, useController } from 'react-hook-form';
import Link from 'next/link';

function page() {
  // Hooks
  const { data: session } = useSession();

  const hookform = useForm<SnippetPayload>({
    defaultValues: {
      timestamp: new Date().getTime(),
    },
    mode: 'onChange',
  });

  const { field: snippetField } = useController({
    control: hookform.control,
    name: 'snippet',

    rules: {
      // required: true,
      validate: (value: string) => {
        if (value.length > 0) return true;

        return false;
      },
    },
  });

  // Helpers
  const handleSave = async () => {
    const values = hookform.getValues();

    try {
      await axiosInstance.post('/api/snippet', {
        ...values,
        user_id: session?.user.id,
        user_name: session?.user.name,
      });
    } catch (error) {}
  };

  return (
    <FormProvider {...hookform}>
      <form
        onSubmit={hookform.handleSubmit(handleSave)}
        className='flex flex-col gap-4 min-h-screen max-w-[1442px] w-full mx-auto p-3'
      >
        <div className='flex-[0] flex justify-between'>
          <LangueDropdown />

          <TagDropdown />
        </div>

        <div className='flex-1'>
          <Editor
            width='100%'
            height='80vh'
            language={hookform.getValues('langue')}
            theme='vs-dark'
            onChange={(value) => snippetField.onChange(value)}
          />
        </div>

        <div className='action flex-[0] flex gap-4 justify-end'>
          <Button type='button'>
            <Link href='/'>Back</Link>
          </Button>
          <Button type='submit' disabled={!hookform.formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default page;
