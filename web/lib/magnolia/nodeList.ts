export function nodeList<T extends NodeType>(collection?: NodeType & Record<string, T>): T[] {
  if (!collection?.["@nodes"]) {
    return [];
  }

  return collection["@nodes"].map((nodeName) => collection[nodeName]).filter(Boolean) as T[];
}
