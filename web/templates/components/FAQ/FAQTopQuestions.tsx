import { resolvePath } from "@/lib/magnolia/helpers";
import { getFAQs } from "@/lib/magnolia/template";

type FAQTopQuestionsProps = {
  metadata: NodeType;
  faqsRootFolder: NodeType | string;
  faqs?: FAQType[];
};

type FAQTopQuestionsNode = NodeType & {
  faqsRootFolder?: NodeType | string;
  faqs?: FAQType[];
};

export async function hydrateFAQTopQuestions(node: NodeType, search = "") {
  const componentNode = node as FAQTopQuestionsNode;

  if (componentNode["mgnl:template"] === "faqs:components/faqsTopQuestions") {
    const rootPath = resolvePath(componentNode.faqsRootFolder);
    componentNode.faqs = rootPath ? (await getFAQs(rootPath, search)).results : [];
  }

  await Promise.all(
    (node["@nodes"] ?? []).map(async (childName) => {
      const child = node[childName];

      if (child && typeof child === "object") {
        await hydrateFAQTopQuestions(child as NodeType, search);
      }
    }),
  );
}

const FAQTopQuestions = ({ faqs }: FAQTopQuestionsProps) => {
  if (!faqs?.length) {
    return <div>No questions found</div>;
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Top Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq["@id"] ?? faq["@path"]} className="border-b border-neutral-200 py-3">
            <summary className="cursor-pointer font-medium">{faq.question ?? faq.name ?? faq["@name"]}</summary>
            {faq.answer && <p className="mt-2 text-neutral-700">{faq.answer}</p>}
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQTopQuestions;
