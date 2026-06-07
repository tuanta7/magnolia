import { Footer } from "@/templates/components";
import { EditableArea } from "@magnolia/react-editor";

type FooterAreaProps = {
  content: NodeType;
  customPath?: string;
};

// FooterArea is a magnolia area with a fallback option for footer.
export const FooterArea = ({ content, customPath }: FooterAreaProps) => {
  if (customPath) {
    return <EditableArea content={content} customView={() => <Footer path={customPath} />} />;
  }

  return <EditableArea content={content} />;
};
