import { Fragment } from "react";

import { EditableArea } from "@magnolia/react-editor";

import { resolvePath } from "@/lib/magnolia/helpers";
import { FooterArea } from "@/templates/areas/FooterArea";
import { HeaderArea } from "@/templates/areas/HeaderArea";

type FAQPageProps = PageType & {
  contents?: AreaType;
  header?: AreaType;
  footer?: AreaType;
  defaultHeader?: string | NodeType;
  defaultFooter?: string | NodeType;
};

const FAQPage = ({ contents, header, footer, defaultHeader, defaultFooter }: FAQPageProps) => {
  return (
    <Fragment>
      {header && <HeaderArea content={header} custom={resolvePath(defaultHeader)} />}
      <main className="min-h-screen bg-neutral-100">{contents && <EditableArea content={contents} />}</main>
      {footer && <FooterArea content={footer} custom={resolvePath(defaultFooter)} />}
    </Fragment>
  );
};

export default FAQPage;
