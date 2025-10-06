import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const ShareSnippetDialog = ({
  isOpen,
  close,
  path,
}: {
  isOpen: boolean;
  close: () => void;
  path?: string;
}) => {
  // Hooks
  const { t } = useTranslation();

  // Helpers
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(path ?? '');
      alert('Copied to clipboard ✅');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={close}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md rounded-xl bg-bg-2 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <DialogTitle
              as='h3'
              className='text-base font-medium text-light-text'
            >
              {t('title.shareSnippet')}
            </DialogTitle>
            <p className='mt-2 text-sm/6 text-white/50'>{path}</p>
            <div className='mt-4'>
              <Button onClick={handleCopy}>{t('button.copy')}</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareSnippetDialog;
