import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { EditablePage } from "@magnolia/react-editor";

import { environments } from "@/lib/environments";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia";
import config from "@/templates/config";

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<SearchParams>;
};

function buildMagnoliaPath(slug: string[] = []) {
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

function buildQueryString(searchMap: SearchParams) {
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

export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, searchMap] = await Promise.all([params, searchParams]);
  const path = buildMagnoliaPath(slug);
  const queryString = buildQueryString(searchMap);
  const requestPath = queryString ? path.concat(queryString) : path;

  const ctx = EditorContextService.getMagnoliaContext(
    requestPath,
    environments.mgnlSitePath,
    environments.mgnlLanguages,
  );

  const nodePath = ctx.nodePath ?? path;
  const [page, templateAnnotations] = await Promise.all([
    getPage(nodePath, ctx.search),
    ctx.isMagnolia ? getTemplateAnnotations(nodePath, ctx.search) : Promise.resolve(undefined),
  ]);

  console.log("Node path:", nodePath);
  console.log("Rendering MagnoliaPage with context:", ctx);
  console.log("Page content:", page);
  console.log("Template annotations:", templateAnnotations);

  return (
    <div className={ctx?.isMagnoliaEdit ? "disable-a-pointer-events grow" : "grow"}>
      <EditablePage
        content={page}
        config={config}
        magnoliaContext={ctx}
        templateAnnotations={templateAnnotations || {}}
      />
    </div>
  );
}
