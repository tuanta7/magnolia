import { Fragment } from "react";

import { EditableArea } from "@magnolia/react-editor";

import { resolvePath } from "@/lib/magnolia/helpers";
import { FooterArea } from "@/templates/areas/FooterArea";
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
      <HeaderArea content={header} customPath={resolvePath(defaultHeader)} />
      <main className="min-h-[90vh] p-6 border-t">{content && <EditableArea content={content} />}</main>
      <FooterArea content={footer} customPath={resolvePath(defaultFooter)} />
    </Fragment>
  );
};

export default HomePage;
