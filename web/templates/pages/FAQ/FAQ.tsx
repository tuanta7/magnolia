import { Fragment } from "react";

import { EditableArea } from "@magnolia/react-editor";

type FAQPageProps = PageType & {
  contents?: AreaType;
};

const FAQPage = ({ contents }: FAQPageProps) => {
  return (
    <Fragment>
      <header>Header</header>
      {contents && <EditableArea content={contents} />}
      <footer>Footer</footer>
    </Fragment>
  );
};

export default FAQPage;
