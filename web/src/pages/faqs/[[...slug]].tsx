import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import type { IMagnoliaContext } from "@magnolia/frontend-helpers-base";
import { EditorContextService } from "@magnolia/frontend-helpers-base";
import { EditablePage } from "@magnolia/react-editor";

import { environments } from "@/lib/environments";
import { buildMagnoliaPath, buildQueryString } from "@/lib/faqs/helpers";
import { getPage, getTemplateAnnotations } from "@/lib/magnolia/template";
import { FAQSearchInput, FAQTopQuestions, Placeholder } from "@/templates/components";
import { hydrateFAQTopQuestions } from "@/templates/components/FAQ/FAQTopQuestions";
import { FAQPage as FAQPageTemplate } from "@/templates/pages";

export type Params = {
  slug?: string[];
};

type FaqPageProps = {
  page: PageType;
  magnoliaContext: IMagnoliaContext;
  templateAnnotations?: TemplateAnnotationsType;
};

export const getServerSideProps: GetServerSideProps<FaqPageProps, Params> = async (context) => {
  const path = buildMagnoliaPath(context.params?.slug, environments.mgnlSitePath);
  const queryString = buildQueryString(context.query);
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
    console.error("Failed to fetch Magnolia FAQ page:", error);
    return {
      notFound: true,
    };
  }

  const templateAnnotations = ctx.isMagnolia ? await getTemplateAnnotations(nodePath, ctx.search) : undefined;

  console.log("Node path:", nodePath, ctx.search);
  console.log("Rendering MagnoliaPage with context:", ctx);
  console.log("Page content:", page);
  console.log("Template annotations:", templateAnnotations);

  await hydrateFAQTopQuestions(page);

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
            "faqs:components/faqsSearchInput": FAQSearchInput,
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
