import { Fragment } from "react";
import { path } from "@/lib/magnolia";
import { FooterArea } from "@/templates/areas/FooterArea";
import { EditableArea } from "@magnolia/react-editor";
import { HeaderArea } from "@/templates/areas/HeaderArea";

type HomePageProps = PageType & {
  content: AreaType;
  header: AreaType;
  footer: AreaType;
  defaultHeader?: string | NodeType;
  defaultFooter?: string | NodeType;
};

const HomePage = async ({ content, header, footer, defaultHeader, defaultFooter }: HomePageProps) => {
  return (
    <Fragment>
      <HeaderArea content={header} customPath={path(defaultHeader)} />
      <main className="min-h-[90vh] p-6 border-t">{content && <EditableArea content={content} />}</main>
      <FooterArea content={footer} customPath={path(defaultFooter)} />
    </Fragment>
  );
};

export default HomePage;
