import { EditableArea } from "@magnolia/react-editor";

type FAQPageProps = PageType & {
  contents?: AreaType;
};

const FAQPage = ({ contents }: FAQPageProps) => {
  return <>{contents && <EditableArea content={contents} />}</>;
};

export default FAQPage;
