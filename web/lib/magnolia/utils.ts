export function path(c: string | NodeType): string {
  return typeof c === "string" ? c : c["@path"];
}
