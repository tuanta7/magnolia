import { Footer } from "@/components";
import { EditableArea } from "@magnolia/react-editor";

export const FooterArea = ({ content, footer }: { content: NodeType; footer?: FooterType }) => {
  if (!footer) {
    return <EditableArea content={content} />;
  }

  const FooterView = () => <Footer footer={footer} />;
  return <EditableArea content={content} customView={FooterView} />;
};
