import { Fragment } from "react";
import { path } from "@/lib/magnolia";
import { FooterArea } from "@/templates/areas/FooterArea";
import { EditableArea } from "@magnolia/react-editor";

type HomePageProps = PageType & {
  content: AreaType;
  header: AreaType;
  footer: AreaType;
  defaultHeader?: string | NodeType;
  defaultFooter?: string | NodeType;
};

const HomePage = async ({ content, header, footer, defaultFooter }: HomePageProps) => {
  return (
    <Fragment>
      <header>{header && <EditableArea content={header} />}</header>
      <main className="min-h-[90vh] p-6 border-t">{content && <EditableArea content={content} />}</main>
      <FooterArea content={footer} customPath={path(defaultFooter)} />
    </Fragment>
  );
};

export default HomePage;
