import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia/contents";
import { environments } from "@/lib/environments/environments";
import MagnoliaPage from "./MagnoliaPage";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const path = "/manutd/".concat(slug ? slug.join("/") : "");
  const searchMap = await searchParams;
  const searchSring =
    Object.keys(searchMap).length > 0 ? `?${new URLSearchParams(searchMap as Record<string, string>).toString()}` : "";

  const ctx = await EditorContextService.getMagnoliaContext(
    path + searchSring,
    environments.mgnlSitePath,
    environments.mgnlLanguages,
  );

  const page = await getPage(path, ctx.search);

  const templateAnnotations = ctx.isMagnolia ? await getTemplateAnnotations(path, ctx.search) : undefined;

  return <MagnoliaPage page={page} ctx={ctx} templateAnnotations={templateAnnotations} />;
}
