import { environments } from "@/lib/environments";

export function buildMagnoliaPath(slug: string[] = []) {
  const relativePath = slug.join("/");
  if (!relativePath) {
    return environments.mgnlSitePath;
  }

  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  if (normalizedPath === environments.mgnlSitePath || normalizedPath.startsWith(`${environments.mgnlSitePath}/`)) {
    return normalizedPath;
  }

  return `${environments.mgnlSitePath}${normalizedPath}`.replace(/\/+/g, "/");
}

export function buildQueryString(searchMap: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();

  Object.entries(searchMap).forEach(([key, value]) => {
    if (value === undefined) {
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
