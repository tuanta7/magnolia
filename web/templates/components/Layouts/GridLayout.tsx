import { EditableArea } from "@magnolia/react-editor";

const MIN_COLUMNS = 1;
const MAX_COLUMNS = 4;

type GridLayoutProps = NodeType & {
  colNumber?: number | string;
  columnRatio?: string;
  gap?: string;
  maxWidth?: string;
  stickyFirstColumn?: boolean;
  column1?: AreaType;
  column2?: AreaType;
  column3?: AreaType;
  column4?: AreaType;
};

const columnClasses = {
  1: "grid-cols-1",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

const twoColumnClasses: Record<string, string> = {
  equal: "grid-cols-1 lg:grid-cols-2",
  leftSidebar: "grid-cols-1 lg:grid-cols-[minmax(15rem,1fr)_minmax(0,2fr)]",
  leftSidebarNarrow: "grid-cols-1 lg:grid-cols-[minmax(15rem,1fr)_minmax(0,3fr)]",
  rightSidebar: "grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(15rem,1fr)]",
};

const gapClasses: Record<string, string> = {
  none: "gap-0",
  small: "gap-2",
  medium: "gap-4",
  large: "gap-8",
};

const maxWidthClasses: Record<string, string> = {
  content: "mx-auto w-full max-w-5xl",
  wide: "mx-auto w-full max-w-7xl",
  full: "w-full",
};

const GridLayout = ({
  colNumber,
  columnRatio,
  gap,
  maxWidth,
  stickyFirstColumn,
  column1,
  column2,
  column3,
  column4,
}: GridLayoutProps) => {
  const requestedColumns = Number(colNumber);
  const numberOfColumns = Number.isFinite(requestedColumns)
    ? Math.min(MAX_COLUMNS, Math.max(MIN_COLUMNS, Math.trunc(requestedColumns)))
    : MIN_COLUMNS;
  const columns = [column1, column2, column3, column4].slice(0, numberOfColumns);
  const gridColumnsClass =
    numberOfColumns === 2
      ? (twoColumnClasses[columnRatio ?? "leftSidebar"] ?? twoColumnClasses.leftSidebar)
      : columnClasses[numberOfColumns as keyof typeof columnClasses];
  const gapClass = gapClasses[gap ?? "medium"] ?? gapClasses.medium;
  const maxWidthClass = maxWidthClasses[maxWidth ?? "wide"] ?? maxWidthClasses.wide;

  return (
    <div className={maxWidthClass}>
      <div className={`grid items-start ${gapClass} ${gridColumnsClass}`}>
        {columns.map((content, index) => (
          <GridColumn
            key={`column-${index + 1}`}
            content={content}
            sticky={stickyFirstColumn !== false && index === 0 && numberOfColumns > 1}
          />
        ))}
      </div>
    </div>
  );
};

const GridColumn = ({ content, sticky }: { content?: AreaType; sticky?: boolean }) => {
  return (
    <div className={sticky ? "min-w-0 lg:sticky lg:top-4 lg:self-start" : "min-w-0"}>
      {content && <EditableArea content={content} />}
    </div>
  );
};

export default GridLayout;
