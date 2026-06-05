import { Footer } from "@/templates/components";
import { EditableArea } from "@magnolia/react-editor";

// FooterArea is a custom Magnolia area with a default option.
export const FooterArea = ({ content, footer }: { content: NodeType; footer?: FooterType }) => {
  if (!footer) {
    return <EditableArea content={content} />;
  }

  const FooterView = () => <Footer footer={footer} />;
  return <EditableArea content={content} customView={FooterView} />;
};
