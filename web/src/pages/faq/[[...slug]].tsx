import type { IMagnoliaContext } from "@magnolia/frontend-helpers-base";
import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { EditablePage } from "@magnolia/react-editor";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ParsedUrlQuery } from "querystring";

import { environments } from "@/lib/environments";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia/template";
import { FAQTopQuestions, Placeholder } from "@/templates/components";
import { hydrateFAQTopQuestions } from "@/templates/components/FAQ/FAQTopQuestions";
import { FAQPage as FAQPageTemplate } from "@/templates/pages";

type Params = {
  slug?: string[];
};

type FaqPageProps = {
  page: PageType;
  magnoliaContext: IMagnoliaContext;
  templateAnnotations?: TemplateAnnotationsType;
};

function buildMagnoliaPath(params: Params | undefined, mgnlSitePath: string) {
  const slug = ["faq", ...(params?.slug ?? [])];
  const relativePath = slug.join("/");
  if (!relativePath) {
    return mgnlSitePath;
  }

  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  if (normalizedPath === mgnlSitePath || normalizedPath.startsWith(`${mgnlSitePath}/`)) {
    return normalizedPath;
  }

  return `${mgnlSitePath}${normalizedPath}`.replace(/\/+/g, "/");
}

function buildQueryString(query: ParsedUrlQuery) {
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

export const getServerSideProps: GetServerSideProps<FaqPageProps, Params> = async (context) => {
  const path = buildMagnoliaPath(context.params, environments.mgnlSitePath);
  const queryString = buildQueryString(context.query);
  const requestPath = queryString ? path.concat(queryString) : path;

  console.log("Request path", requestPath);

  const ctx = EditorContextService.getMagnoliaContext(
    requestPath,
    environments.mgnlSitePath,
    environments.mgnlLanguages,
  );

  const nodePath = ctx.nodePath ?? path;
  const page = await getPage(nodePath, ctx.search);
  await hydrateFAQTopQuestions(page, ctx.search);
  const templateAnnotations = ctx.isMagnolia ? await getTemplateAnnotations(nodePath, ctx.search) : undefined;

  console.log("Node path:", nodePath, ctx.search);
  console.log("Rendering MagnoliaPage with context:", ctx);
  console.log("Page content:", page);
  console.log("Template annotations:", templateAnnotations);

  return {
    props: {
      page,
      magnoliaContext: ctx,
      templateAnnotations: templateAnnotations ?? {},
    },
  };
};

export default function FAQPage({
  page,
  magnoliaContext,
  templateAnnotations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={magnoliaContext?.isMagnoliaEdit ? "disable-a-pointer-events grow" : "grow"}>
      <EditablePage
        content={page}
        config={{
          componentMappings: {
            "faqs:pages/faq": FAQPageTemplate,
            "faqs:components/faqsTopQuestions": FAQTopQuestions,
            "faqs:components/faqsCategoryDetails": Placeholder,
            "faqs:components/faqsSideNav": Placeholder,
          },
        }}
        magnoliaContext={magnoliaContext}
        templateAnnotations={templateAnnotations || {}}
      />
    </div>
  );
}
