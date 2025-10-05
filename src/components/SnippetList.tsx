import React from 'react';
import SnippetCard from './SnippetCard';

const SnippetList = ({ data }: { data?: Snippet[] }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8'>
      {data && data.map((i) => <SnippetCard key={i._id} snippet={i} />)}
    </div>
  );
};

export default SnippetList;
