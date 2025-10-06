import React from 'react';
import { useSession } from 'next-auth/react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import axiosInstance from '@/lib/axios';
import { LangueDropdown, Button } from '@/components';
import TagDropdown from '@/components/TagDropdown';
import { Editor } from '@monaco-editor/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const SnippetForm = ({ defaultValues }: { defaultValues?: Snippet }) => {
  const { _id, ...restDefaultValues } = defaultValues ?? {};

  // Hooks
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const hookform = useForm<SnippetPostPayload>({
    defaultValues: {
      ...restDefaultValues,
    },
    mode: 'onChange',
  });

  const { field: snippetField } = useController({
    control: hookform.control,
    name: 'snippet',

    rules: {
      validate: (value?: string) => {
        if (value && value?.length > 0) return true;

        return false;
      },
    },
  });

  // States
  const snippetId = searchParams.get('id');

  // Helpers
  const handleSave = async () => {
    const values = hookform.getValues();
    const body = {
      ...values,
      user_id: session?.user.id,
      user_name: session?.user.name,
    };

    try {
      if (snippetId) {
        // Update
        await axiosInstance.put('/api/snippet', {
          ...body,
          _id,
        });
      } else {
        // Create
        await axiosInstance.post('/api/snippet', body);
      }
    } catch (error) {
    } finally {
      router.push('/');
    }
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
            defaultValue={hookform.getValues('snippet')}
          />
        </div>

        <div className='action flex-[0] flex gap-4 justify-end'>
          <Button type='button'>
            <Link href='/'>{t('button.back')}</Link>
          </Button>
          <Button type='submit' disabled={!hookform.formState.isValid}>
            {t('button.save')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
