import { EditableArea } from "@magnolia/react-editor";

type FAQPageProps = PageType & {
  content?: AreaType;
};

const FAQPage = ({ content }: FAQPageProps) => {
  return <>{content && <EditableArea content={content} />}</>;
};

export default FAQPage;
