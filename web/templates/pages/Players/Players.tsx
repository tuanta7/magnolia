import { EditableArea } from "@magnolia/react-editor";

type PlayersPageProps = PageType & {
  content: AreaType;
  header?: string;
  footer?: string;
};

const PlayersPage = ({ content }: PlayersPageProps) => {
  return <>{content && <EditableArea content={content} />}</>;
};

export default PlayersPage;
