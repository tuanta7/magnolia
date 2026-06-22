import { decode } from "html-entities";

import { getFAQs } from "@/lib/magnolia/template";

import FAQSearchForm from "./FAQSearchForm";

const COMPONENT_IDS = new Set(["faqs:components/faqsSearch", "faqs:components/faqsSearchInput"]);

type FAQSearchNode = NodeType & {
  placeholder?: string;
  searchQuery?: string;
  faqs?: FAQType[];
  total?: number;
  searchError?: string;
};

const findSearchNodes = (node: NodeType): FAQSearchNode[] => {
  const matches = COMPONENT_IDS.has(node["mgnl:template"] ?? "") ? [node as FAQSearchNode] : [];

  (node["@nodes"] ?? []).forEach((childName) => {
    const child = node[childName];

    if (child && typeof child === "object") {
      matches.push(...findSearchNodes(child as NodeType));
    }
  });

  return matches;
};

export async function hydrateFAQSearch(node: NodeType, searchQuery: string) {
  const searchNodes = findSearchNodes(node);

  if (!searchNodes.length) {
    return;
  }

  if (!searchQuery) {
    searchNodes.forEach((searchNode) => {
      searchNode.searchQuery = "";
      delete searchNode.faqs;
      delete searchNode.total;
      delete searchNode.searchError;
    });
    return;
  }

  try {
    const response = await getFAQs(
      "",
      new URLSearchParams({
        limit: "20",
        q: searchQuery,
      }).toString(),
    );
    const faqs = response?.results ?? [];
    const total = response?.total ?? faqs.length;

    searchNodes.forEach((searchNode) => {
      searchNode.searchQuery = searchQuery;
      searchNode.faqs = faqs;
      searchNode.total = total;
      delete searchNode.searchError;
    });
  } catch (error) {
    console.error(`Failed to search FAQs for "${searchQuery}":`, error);

    searchNodes.forEach((searchNode) => {
      searchNode.searchQuery = searchQuery;
      searchNode.faqs = [];
      searchNode.total = 0;
      searchNode.searchError = "We couldn't load the search results. Please try again.";
    });
  }
}

const FAQQuestion = ({ faq }: { faq: FAQType }) => {
  if (faq.question) {
    return <span className="[&_p]:inline" dangerouslySetInnerHTML={{ __html: decode(faq.question) }} />;
  }

  return faq.name ?? faq["@name"];
};

const FAQSearch = ({ placeholder, searchQuery, faqs, total, searchError }: ComponentType & FAQSearchNode) => {
  const resultCount = total ?? faqs?.length ?? 0;

  return (
    <section className="bg-neutral-100 px-4 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <FAQSearchForm placeholder={placeholder} searchQuery={searchQuery} />

        {searchQuery && (
          <div className="mt-8 pb-4 sm:mt-10 sm:pb-6" aria-live="polite">
            <div className="mb-5 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
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
        )}
      </div>
    </section>
  );
};

export default FAQSearch;
