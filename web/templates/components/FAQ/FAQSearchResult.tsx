import { decode } from "html-entities";

import { getFAQs } from "@/lib/magnolia/template";

const COMPONENT_ID = "faqs:components/faqsSearchResult";

type FAQSearchResultNode = NodeType & {
  searchQuery?: string;
  faqs?: FAQType[];
  total?: number;
  searchError?: string;
};

export async function hydrateFAQSearchResult(node: NodeType, searchQuery: string) {
  const componentNode = node as FAQSearchResultNode;

  if (componentNode["mgnl:template"] === COMPONENT_ID) {
    componentNode.searchQuery = searchQuery;

    try {
      const response = await getFAQs(
        "",
        new URLSearchParams({
          limit: "20",
          q: searchQuery,
        }).toString(),
      );

      console.log("Search: ", response);
      componentNode.faqs = response?.results ?? [];
      componentNode.total = response?.total ?? componentNode.faqs.length;
      componentNode.searchError = undefined;
    } catch (error) {
      console.error(`Failed to search FAQs for "${searchQuery}":`, error);
      componentNode.faqs = [];
      componentNode.total = 0;
      componentNode.searchError = "We couldn't load the search results. Please try again.";
    }
  }

  await Promise.all(
    (node["@nodes"] ?? []).map(async (childName) => {
      const child = node[childName];

      if (child && typeof child === "object") {
        await hydrateFAQSearchResult(child as NodeType, searchQuery);
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

const FAQSearchResult = ({ searchQuery, faqs, total, searchError }: ComponentType & FAQSearchResultNode) => {
  if (!searchQuery) {
    return null;
  }

  const resultCount = total ?? faqs?.length ?? 0;

  return (
    <section className="bg-neutral-100 px-4 pb-10 sm:pb-14" aria-live="polite">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-5 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#c70101]">FAQ search</p>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-950 sm:text-3xl">
              Search results
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              {resultCount} {resultCount === 1 ? "result" : "results"} for
              <span className="font-semibold text-neutral-950"> “{searchQuery}”</span>
            </p>
          </div>
        </div>

        {searchError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-sm font-medium text-red-900">
            {searchError}
          </div>
        ) : faqs?.length ? (
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq["@id"] ?? faq["@path"]}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow-md open:border-red-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-neutral-900 outline-none transition hover:text-[#c70101] focus-visible:ring-2 focus-visible:ring-[#c70101] focus-visible:ring-inset sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 text-base leading-6 sm:text-lg">
                    <FAQQuestion faq={faq} />
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
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm">
            <h3 className="text-lg font-bold text-neutral-950">No FAQs found</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Try a shorter or more general search term.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSearchResult;
