import { path, getFooter } from "@/lib/magnolia";
import { FooterArea } from "@/templates/areas/FooterArea";
import { EditableArea } from "@magnolia/react-editor";

type HomePageProps = PageType & {
  content: ContentType;
  header?: string;
  footer?: string | ContentType;
  customHeader: ContentType;
  customFooter: ContentType;
};

const HomePage = async ({ content, footer, customHeader, customFooter }: HomePageProps) => {
  const footerComponent = footer ? await getFooter(path(footer)) : undefined;

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
