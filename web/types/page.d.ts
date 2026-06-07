declare type AreaType = NodeType & {
  "0": NodeType;
};

declare type PageType = NodeType & {
  title?: string;
  metadata: NodeType;
  hidden?: boolean;
};

declare type PageProps = {
  path: string;
  page: PageType;
  templateAnnotations?: TemplateAnnotationsType;
};
