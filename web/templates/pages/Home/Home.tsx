import { getFooter } from "@/lib/magnolia/contents";
import { FooterArea } from "@/templates/components/FooterArea";
import { EditableArea } from "@magnolia/react-editor";

type HomePageProps = PageType & {
  content: ContentType;
  header?: string;
  footer?: string;
  customHeader: ContentType;
  customFooter: ContentType;
};

const HomePage = async ({ content, footer, customHeader, customFooter }: HomePageProps) => {
  const footerComponent = footer ? await getFooter(footer) : undefined;

  return (
    <>
      <header>{customHeader && <EditableArea content={customHeader} />}</header>
      <main className="min-h-[90vh] p-6 border-t">{content && <EditableArea content={content} />}</main>
      <footer>
        <FooterArea content={customFooter} footer={footerComponent} />
      </footer>
    </>
  );
};

export default HomePage;
