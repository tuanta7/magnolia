import { EditableArea } from "@magnolia/react-editor";

const MIN_COLUMNS = 1;
const MAX_COLUMNS = 4;

type GridLayoutProps = NodeType & {
  colNumber?: number | string;
  column1?: AreaType;
  column2?: AreaType;
  column3?: AreaType;
  column4?: AreaType;
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

const GridLayout = ({ colNumber, column1, column2, column3, column4 }: GridLayoutProps) => {
  const requestedColumns = Number(colNumber);
  const numberOfColumns = Number.isFinite(requestedColumns)
    ? Math.min(MAX_COLUMNS, Math.max(MIN_COLUMNS, Math.trunc(requestedColumns)))
    : MIN_COLUMNS;
  const columns = [column1, column2, column3, column4].slice(0, numberOfColumns);

  return (
    <div className={`grid gap-4 ${columnClasses[numberOfColumns as keyof typeof columnClasses]}`}>
      {columns.map((content, index) => (
        <GridColumn key={`column-${index + 1}`} content={content} />
      ))}
    </div>
  );
};

const GridColumn = ({ content }: { content?: AreaType }) => {
  console.log(content);
  return <div className="min-w-0">{content && <EditableArea content={content} />}</div>;
};

export default GridLayout;
