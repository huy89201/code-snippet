import React from 'react';

const SnippetList = ({ data }: { data?: Snippet[] }) => {
  return (
    <div>{data && data.map((i) => <div key={i._id}>{i.snippet}</div>)}</div>
  );
};

export default SnippetList;
