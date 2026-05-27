import { EditableComponent } from "@magnolia/react-editor";

type FlexLayoutProps = {
  margin?: string;
  padding: NodeType;
  content: ContentType; // Replace with the actual type of content
};

const FlexLayout = (props: FlexLayoutProps) => {
  const { padding, margin, content } = props;
  const paddingValue = padding["field"] === "true" ? "1rem" : `${padding["value"]}`;
  const marginValue = margin || "0";

  return (
    <div
      style={{
        padding: paddingValue || "0",
        margin: marginValue,
      }}
    >
      <p>Flex Container</p>
      {content && <EditableComponent content={content} />}
    </div>
  );
};

export default FlexLayout;
