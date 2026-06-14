declare type FAQType = NodeType & {
  name?: string;
  question?: string;
  answer?: string;
  categories?: unknown;
};

declare type FAQListType = {
  total: number;
  offset: number;
  limit: number;
  results: FAQType[];
};
