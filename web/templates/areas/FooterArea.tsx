import { EditableArea } from "@magnolia/react-editor";

import { Footer } from "@/templates/components";

type FooterAreaProps = {
  content: NodeType;
  custom?: NodeType | string;
};

// FooterArea is a magnolia area with a fallback option for footer.
export const FooterArea = ({ content, custom }: FooterAreaProps) => {
  if (custom) {
    return <EditableArea content={content} customView={() => <Footer footer={custom} />} />;
  }

  return <EditableArea content={content} />;
};
