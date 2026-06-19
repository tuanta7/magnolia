import { decode } from "html-entities";

import { resolvePath } from "@/lib/magnolia/helpers";
import { getFAQs } from "@/lib/magnolia/template";

const COMPONENT_ID = "faqs:components/faqsTopQuestions";

type FAQTopQuestionsNode = NodeType & {
  faqsRootFolder?: NodeType | string;
  faqsHighlights: FAQType[];
  faqsMostAsked: FAQType[];
};

// for pages-router rendering
export async function hydrateFAQTopQuestions(node: NodeType) {
  const componentNode = node as FAQTopQuestionsNode;

  if (componentNode["mgnl:template"] === COMPONENT_ID) {
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
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Most Asked</h2>
      <div className="space-y-3">
        {faqsMostAsked.map((faq) => (
          <details key={faq["@id"] ?? faq["@path"]} className="border-b border-neutral-200 py-3">
            <summary className="cursor-pointer font-medium">
              <FAQQuestion faq={faq} />
            </summary>
            {faq.answer && (
              <div className="mt-2 text-neutral-700" dangerouslySetInnerHTML={{ __html: decode(faq.answer) }} />
            )}
          </details>
        ))}
      </div>
      <h2 className="mb-4 text-2xl font-semibold">Highlights</h2>
      <div className="space-y-3">
        {faqsHighlights.map((faq) => (
          <details key={faq["@id"] ?? faq["@path"]} className="border-b border-neutral-200 py-3">
            <summary className="cursor-pointer font-medium">
              <FAQQuestion faq={faq} />
            </summary>
            {faq.answer && (
              <div className="mt-2 text-neutral-700" dangerouslySetInnerHTML={{ __html: decode(faq.answer) }} />
            )}
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQTopQuestions;
