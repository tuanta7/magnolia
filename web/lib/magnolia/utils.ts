export function path(c?: string | NodeType): string {
  if (!c) {
    return "";
  }

  return typeof c === "string" ? c : c["@path"];
}
