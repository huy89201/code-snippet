'use client';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowDown } from 'react-icons/fa';

type Lang = 'en' | 'vi';
const DEFAULT_LANGUE = localStorage.getItem('lang');

const LangDropdown = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState<Lang>(
    (DEFAULT_LANGUE as Lang) ?? 'en'
  );
  const langues = ['en', 'vi'];

  return (
    <Menu>
      <MenuButton>
        <div className='text-light-text text-base font-medium flex gap-1 items-baseline'>
          {lang} <FaArrowDown className='size-3' />
        </div>
      </MenuButton>
      <MenuItems
        anchor='bottom end'
        className='z-10 w-52 h-52 origin-top-right rounded-xl border border-bg-3 bg-bg-3 p-1 text-sm/6 text-light-text transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
      >
        {langues.map((lang) => (
          <MenuItem key={lang}>
            <button
              className='group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left'
              onClick={() => {
                setLang(lang as Lang);
                i18n.changeLanguage(lang);
                moment.locale(lang);
                localStorage.setItem('lang', lang);
              }}
            >
              {lang}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LangDropdown;
