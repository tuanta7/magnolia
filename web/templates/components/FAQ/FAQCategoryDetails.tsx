import { decode } from "html-entities";

import { resolvePath } from "@/lib/magnolia/helpers";
import { getCategory, getFAQs } from "@/lib/magnolia/template";

import FAQTopQuestions from "./FAQTopQuestions";

const COMPONENT_ID = "faqs:components/faqsCategoryDetails";

type FAQCategoryDetailsNode = NodeType & {
  faqsRootFolder?: NodeType | string;
  category?: string;
  faqs?: FAQType[];
  faqsHighlights?: FAQType[];
  faqsMostAsked?: FAQType[];
};

// for pages-router rendering
export async function hydrateFAQCategoryDetails(node: NodeType, category: string, categoryId = "") {
  const componentNode = node as FAQCategoryDetailsNode;

  if (componentNode["mgnl:template"] === COMPONENT_ID) {
    componentNode.category = category;
    const rootPath = resolvePath(componentNode.faqsRootFolder);

    if (!rootPath) {
      componentNode.faqs = [];
    } else {
      try {
        if (!categoryId) {
          const c = await getCategory(category);
          categoryId = c["@id"] || "";
        }

        const faqsByCategory = await getFAQs(
          "",
          new URLSearchParams({
            limit: "20",
            categories: categoryId,
            "@ancestor": rootPath,
          }).toString(),
        );

        componentNode.faqs = faqsByCategory?.results ?? [];
      } catch (error) {
        console.error(`Failed to fetch FAQs for category ${category}:`, error);
        componentNode.faqs = [];
      }
    }
  }

  await Promise.all(
    (node["@nodes"] ?? []).map(async (childName) => {
      const child = node[childName];

      if (child && typeof child === "object") {
        await hydrateFAQCategoryDetails(child as NodeType, category);
      }
    }),
  );
}

const FAQCategoryDetails = (props: ComponentType & FAQCategoryDetailsNode) => {
  const { category, faqs } = props;

  console.log("Details: ", category, faqs);

  if (!category || !faqs) {
    console.log("FAQ Top Questions");
    return <FAQTopQuestions {...props} />;
  }

  return (
    <section className="bg-neutral-100 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 overflow-hidden rounded-3xl bg-[#c70101] px-6 py-8 text-white shadow-lg shadow-red-950/10 sm:px-10 sm:py-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-100">Help Centre</p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">{category.toUpperCase()}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-red-50 sm:text-base">
            Find answers to the most frequently asked questions about {category.toLowerCase()}.
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details
              key={faq["@id"] ?? faq["@path"]}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow-md open:border-red-200 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-neutral-900 outline-none transition hover:text-[#c70101] focus-visible:ring-2 focus-visible:ring-[#c70101] focus-visible:ring-inset sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 text-base leading-6 sm:text-lg">
                  {faq.question ? (
                    <span className="[&_p]:inline" dangerouslySetInnerHTML={{ __html: decode(faq.question) }} />
                  ) : (
                    (faq.name ?? faq["@name"])
                  )}
                </span>
                <span className="relative size-9 shrink-0 rounded-full bg-neutral-100 text-[#c70101] transition group-open:rotate-45 group-open:bg-[#c70101] group-open:text-white">
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                </span>
              </summary>
              {faq.answer && (
                <div
                  className="border-t border-neutral-100 bg-neutral-50 px-5 py-5 text-sm leading-7 text-neutral-700 sm:px-6 sm:text-base [&_a]:font-semibold [&_a]:text-[#c70101] [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:my-3"
                  dangerouslySetInnerHTML={{ __html: decode(faq.answer) }}
                />
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQCategoryDetails;
