declare type FAQType = NodeType & {
  name?: string;
  question?: string;
  answer?: string;
  highlights?: boolean;
  mostAsked?: boolean;
  categories?: unknown;
};

declare type FAQListType = {
  total: number;
  offset: number;
  limit: number;
  results: FAQType[];
};
