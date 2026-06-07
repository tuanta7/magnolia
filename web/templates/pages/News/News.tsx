import { EditableArea } from "@magnolia/react-editor";

type NewsListingPageProps = PageType & {
  header?: AreaType;
  content?: AreaType;
  partners?: AreaType;
  footer?: AreaType;
};

const NewsPage = ({ header, content, partners, footer }: NewsListingPageProps) => {
  return (
    <>
      {header && <EditableArea content={header} />}
      {content && <EditableArea content={content} />}
      {partners && <EditableArea content={partners} />}
      {footer && <EditableArea content={footer} />}
    </>
  );
};

export default NewsPage;
