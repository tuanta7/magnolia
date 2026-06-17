import type { ParsedUrlQuery } from "querystring";

export function buildMagnoliaPath(slug: string[] | undefined, mgnlSitePath: string) {
  // const relativePath = ["faqs", ...(slug ?? [])].join("/");
  const relativePath = "faqs";
  if (!relativePath) {
    return mgnlSitePath;
  }

  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  if (normalizedPath === mgnlSitePath || normalizedPath.startsWith(`${mgnlSitePath}/`)) {
    return normalizedPath;
  }

  return `${mgnlSitePath}${normalizedPath}`.replace(/\/+/g, "/");
}

export function buildQueryString(query: ParsedUrlQuery) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (key === "slug" || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
      return;
    }

    params.set(key, value);
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}
