import { EditableArea } from "@magnolia/react-editor";

import { Header } from "@/templates/components";

type HeaderAreaProps = {
  content: NodeType;
  custom?: NodeType | string;
};

// HeaderArea is a magnolia area with a fallback option for footer.
export const HeaderArea = ({ content, custom }: HeaderAreaProps) => {
  if (custom) {
    return <EditableArea content={content} customView={() => <Header header={custom} />} />;
  }

  return <EditableArea content={content} />;
};
