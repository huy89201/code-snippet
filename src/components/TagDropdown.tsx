'use client';
import React from 'react';
import { GetTagRes } from '@/app/api/tag/route';
import axiosInstance from '@/lib/axios';
import { Tag } from '@/types/tag';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';

const TagDropdown = ({}: {}) => {
  // Hooks
  const hookform = useFormContext<SnippetPayload>();

  const [tags, setTags] = React.useState<Tag[] | undefined>();
  const [currentTag, setCurrentTag] = React.useState<Tag | undefined>();

  React.useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axiosInstance.get<GetTagRes>('/api/tag');

        setTags(data.data);
        setCurrentTag(data?.data?.[0]);

        hookform.setValue('tag_id', data?.data?.[0]._id);
        hookform.setValue('tag_name', data?.data?.[0].name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
  }, []);

  return (
    <Menu>
      <MenuButton>
        <div className='text-light-text text-base font-medium'>
          #<span>{currentTag?.name}</span>
        </div>
      </MenuButton>
      <MenuItems
        anchor='bottom end'
        className='z-10 w-52 h-52 origin-top-right rounded-xl border border-bg-3 bg-bg-3 p-1 text-sm/6 text-light-text transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
      >
        {tags &&
          tags.map((t) => (
            <MenuItem key={t._id}>
              <button
                className='group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 text-left'
                onClick={() => {
                  setCurrentTag(t);
                  hookform.setValue('tag_id', t._id);
                  hookform.setValue('tag_name', t.name);
                }}
              >
                {t.name}
              </button>
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
};

export default TagDropdown;
