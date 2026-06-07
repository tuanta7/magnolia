import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia";
import { environments } from "@/lib/environments/environments";
import { EditablePage } from "@magnolia/react-editor";
import config from "@/magnolia.config";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  let path = "/manutd/".concat(slug ? slug.join("/") : "");

  const searchMap = await searchParams;
  if (Object.keys(searchMap).length > 0) {
    path = path.concat("?", new URLSearchParams(searchMap as Record<string, string>).toString());
  }

  const ctx = EditorContextService.getMagnoliaContext(path, environments.mgnlSitePath, environments.mgnlLanguages);

  const page = await getPage(path, ctx.search);
  const templateAnnotations = ctx.isMagnolia ? await getTemplateAnnotations(path, ctx.search) : undefined;

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
