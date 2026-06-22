export function resolvePath(source: NodeType | string | undefined): string {
  if (!source) {
    return "";
  }

  if (typeof source === "string") {
    return source.startsWith("/") ? source : "";
  }

  return source["@path"];
}

export function nodeList<T extends NodeType>(collection?: NodeType & Record<string, T>): T[] {
  if (!collection?.["@nodes"]) {
    return [];
  }

  return collection["@nodes"].map((nodeName) => collection[nodeName]).filter(Boolean) as T[];
}

export const normalizedPath = (path: string): string => {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return path === "/" ? "" : path;
};
