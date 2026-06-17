import { notFound } from "next/navigation";

import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { EditablePage } from "@magnolia/react-editor";

import { environments } from "@/lib/environments";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia/template";
import config from "@/templates/config";

import { buildMagnoliaPath, buildQueryString } from "./helpers";

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<SearchParams>;
};

export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, searchMap] = await Promise.all([params, searchParams]);
  const path = buildMagnoliaPath(slug);
  const queryString = buildQueryString(searchMap);
  const requestPath = queryString ? path.concat(queryString) : path;

  console.log("Request path", requestPath);

  const ctx = EditorContextService.getMagnoliaContext(
    requestPath,
    environments.mgnlSitePath,
    environments.mgnlLanguages,
  );

  const nodePath = ctx.nodePath ?? path;
  let page: PageType;

  try {
    page = await getPage(nodePath, ctx.search);
  } catch (error) {
    console.error("Failed to fetch Magnolia page:", error);
    notFound();
  }

  const templateAnnotations = ctx.isMagnolia ? await getTemplateAnnotations(nodePath, ctx.search) : undefined;

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
