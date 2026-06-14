// declare module "@magnolia/react-editor";

declare type NodeType = {
  "@id"?: string;
  "@name": string;
  "@path": string;
  "@nodes"?: string[];
  "@nodeType": string;
  "mgnl:template"?: string;
  [key: string]: unknown;
};

declare type TemplateAnnotationsType = {
  [key: string]: string;
};

declare type AreaType = NodeType & {
  "0": NodeType;
};

declare type PageType = NodeType & {
  title?: string;
  metadata?: NodeType;
  hidden?: boolean;
};

declare type ComponentType = {
  metadata: NodeType;
};
