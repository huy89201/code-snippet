type Snippet = {
  _id: string;
  user_name: string;
  user_id: string;
  timestamp: number;
  tag_name: string;
  tag_id: string;
  langue: string;
  snippet: string;
};

type SnippetPayload = Omit<Snippet, '_id'>;

type SnippetParams = {
  page: number;
  page_size: number;
};

type GetSnippetRes = {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  data: Snippet[];
};
