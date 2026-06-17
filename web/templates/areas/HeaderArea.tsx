import { EditableArea } from "@magnolia/react-editor";

import { Header } from "@/templates/components";

type HeaderAreaProps = {
  content: NodeType;
  customPath?: string;
};

// HeaderArea is a magnolia area with a fallback option for footer.
export const HeaderArea = ({ content, customPath }: HeaderAreaProps) => {
  if (customPath) {
    return <EditableArea content={content} customView={() => <Header path={customPath} />} />;
  }

  return <EditableArea content={content} />;
};
