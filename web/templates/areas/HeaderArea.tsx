import { Header } from "@/templates/components";
import { EditableArea } from "@magnolia/react-editor";

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
