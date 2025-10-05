'use client';
import React from 'react';
import { loader } from '@monaco-editor/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_LANGUE } from '@/utils';

const LangueDropdown = ({}: {}) => {
  // Hooks
  const hookform = useFormContext<SnippetPayload>();

  const [langs, setLangs] = React.useState<string[]>([]);
  const [currentLang, setCurrentLang] = React.useState<string>(DEFAULT_LANGUE);

  React.useEffect(() => {
    loader.init().then((monaco) => {
      const langs = monaco.languages.getLanguages();

      setLangs(() => langs.map((l) => l.id));

      hookform.setValue('langue', DEFAULT_LANGUE);
    });
  }, []);

  return (
    <Menu>
      <MenuButton className='w-[10rem]'>
        <div className='flex gap-2'>
          <span className='text-light-text text-base font-medium'>Langue:</span>

          <span className='text-base font-medium text-light-text overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]'>
            {currentLang}
          </span>
        </div>
      </MenuButton>
      <MenuItems
        anchor='bottom end'
        className='w-52 h-52 origin-top-right rounded-xl border border-bg-3 bg-bg-3 p-1 text-sm/6 text-light-text transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
      >
        {langs.map((l) => (
          <MenuItem key={l}>
            <button
              className='group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left'
              onClick={() => {
                setCurrentLang(l);
                hookform.setValue('langue', l);
              }}
            >
              {l}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LangueDropdown;
