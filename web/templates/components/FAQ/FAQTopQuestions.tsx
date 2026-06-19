import { decode } from "html-entities";

import { resolvePath } from "@/lib/magnolia/helpers";
import { getFAQs } from "@/lib/magnolia/template";

const COMPONENT_ID = "faqs:components/faqsTopQuestions";
const ALTERNATIVE_COMPONENT_ID = "faqs:components/faqsCategoryDetails";

type FAQTopQuestionsNode = NodeType & {
  faqsRootFolder?: NodeType | string;
  faqsHighlights?: FAQType[];
  faqsMostAsked?: FAQType[];
};

// for pages-router rendering
export async function hydrateFAQTopQuestions(node: NodeType) {
  const componentNode = node as FAQTopQuestionsNode;

  if (componentNode["mgnl:template"] === COMPONENT_ID || componentNode["mgnl:template"] == ALTERNATIVE_COMPONENT_ID) {
    const rootPath = resolvePath(componentNode.faqsRootFolder);

    if (!rootPath) {
      componentNode.faqsHighlights = [];
      componentNode.faqsMostAsked = [];
    } else {
      const [highlights, mostAsked] = await Promise.all([
        getFAQs("", new URLSearchParams({ limit: "20", highlights: "true", "@ancestor": rootPath }).toString()),
        getFAQs("", new URLSearchParams({ limit: "20", mostAsked: "true", "@ancestor": rootPath }).toString()),
      ]);

      // console.log("FAQs Repsonse", highlights, mostAsked);
      componentNode.faqsHighlights = highlights?.results ?? [];
      componentNode.faqsMostAsked = mostAsked?.results ?? [];
    }
  }

  await Promise.all(
    (node["@nodes"] ?? []).map(async (childName) => {
      const child = node[childName];

      if (child && typeof child === "object") {
        await hydrateFAQTopQuestions(child as NodeType);
      }
    }),
  );
}

const FAQQuestion = ({ faq }: { faq: FAQType }) => {
  if (faq.question) {
    return <span className="[&_p]:inline" dangerouslySetInnerHTML={{ __html: decode(faq.question) }} />;
  }

  return faq.name ?? faq["@name"];
};

const FAQTopQuestions = ({ faqsMostAsked, faqsHighlights }: ComponentType & FAQTopQuestionsNode) => {
  if (!faqsMostAsked || !faqsHighlights) {
    return null;
  }

  return (
    <section className="bg-neutral-100 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 overflow-hidden rounded-3xl bg-[#c70101] px-6 py-8 text-white shadow-lg shadow-red-950/10 sm:px-10 sm:py-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-100">Help Centre</p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-red-50 sm:text-base">
            Quick answers to common questions from Manchester United supporters.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4 px-1">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#c70101]">
                  Supporter favourites
                </p>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-950">Most Asked</h3>
              </div>
              <span className="rounded-full bg-[#c70101] px-3 py-1 text-xs font-bold text-white">
                {faqsMostAsked.length}
              </span>
            </div>
            <div className="grid gap-3">
              {faqsMostAsked.map((faq) => (
                <details
                  key={faq["@id"] ?? faq["@path"]}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow-md open:border-red-200 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold text-neutral-900 outline-none transition hover:text-[#c70101] focus-visible:ring-2 focus-visible:ring-[#c70101] focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 leading-6">
                      <FAQQuestion faq={faq} />
                    </span>
                    <span className="relative size-9 shrink-0 rounded-full bg-neutral-100 text-[#c70101] transition group-open:rotate-45 group-open:bg-[#c70101] group-open:text-white">
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    </span>
                  </summary>
                  {faq.answer && (
                    <div
                      className="border-t border-neutral-100 bg-neutral-50 px-5 py-5 text-sm leading-7 text-neutral-700 [&_a]:font-semibold [&_a]:text-[#c70101] [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:my-3"
                      dangerouslySetInnerHTML={{ __html: decode(faq.answer) }}
                    />
                  )}
                </details>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4 px-1">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Worth knowing</p>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-950">Highlights</h3>
              </div>
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white">
                {faqsHighlights.length}
              </span>
            </div>
            <div className="grid gap-3">
              {faqsHighlights.map((faq) => (
                <details
                  key={faq["@id"] ?? faq["@path"]}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow-md open:border-red-200 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold text-neutral-900 outline-none transition hover:text-[#c70101] focus-visible:ring-2 focus-visible:ring-[#c70101] focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 leading-6">
                      <FAQQuestion faq={faq} />
                    </span>
                    <span className="relative size-9 shrink-0 rounded-full bg-neutral-100 text-[#c70101] transition group-open:rotate-45 group-open:bg-[#c70101] group-open:text-white">
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    </span>
                  </summary>
                  {faq.answer && (
                    <div
                      className="border-t border-neutral-100 bg-neutral-50 px-5 py-5 text-sm leading-7 text-neutral-700 [&_a]:font-semibold [&_a]:text-[#c70101] [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:my-3"
                      dangerouslySetInnerHTML={{ __html: decode(faq.answer) }}
                    />
                  )}
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQTopQuestions;
