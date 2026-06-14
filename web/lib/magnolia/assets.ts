import { environments } from "../environments";

export function getAssetUrl(path: string) {
  if (path.startsWith("/")) {
    return `${environments.mgnlAssets}${path}`;
  }

  // path is a UUID
  if (!path.startsWith("jcr:")) {
    path = "jcr:" + path;
  }

  return `${environments.mgnlAssets}/${path}`;
}
