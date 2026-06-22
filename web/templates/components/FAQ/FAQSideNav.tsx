import Link from "next/link";

import { resolvePath } from "@/lib/magnolia/helpers";
import { getSubCategories } from "@/lib/magnolia/template";

const COMPONENT_ID = "faqs:components/faqsSideNav";
const FAQ_ROUTE = "/faqs";

type FAQSideNavNode = NodeType & {
  faqsRootCategory?: NodeType | string;
  category?: string;
  subCategories?: CategoryType[];
};

const categorySegments = (category: string) => category.split("/").filter(Boolean);

const categoryHref = (segments: string[]) =>
  `${FAQ_ROUTE}/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;

const categoryLabel = (category: string) => {
  const name = categorySegments(category).at(-1) ?? category;

  try {
    return decodeURIComponent(name).replace(/[-_]+/g, " ");
  } catch {
    return name.replace(/[-_]+/g, " ");
  }
};

// Hydrate Magnolia's component node with values derived from the FAQ route.
export async function hydrateFAQSideNav(node: NodeType, category: string) {
  const componentNode = node as FAQSideNavNode;

  if (componentNode["mgnl:template"] === COMPONENT_ID) {
    componentNode.category = category;
    const rootPath = resolvePath(componentNode.faqsRootCategory).replace(/\/+$/, "");
    const categoryPath = [rootPath, ...categorySegments(category)].filter(Boolean).join("/");

    try {
      componentNode.subCategories = await getSubCategories(categoryPath);
    } catch (error) {
      console.error(`Failed to fetch subcategories for ${category}:`, error);
      componentNode.subCategories = [];
    }
  }

  await Promise.all(
    (node["@nodes"] ?? []).map(async (childName) => {
      const child = node[childName];

      if (child && typeof child === "object") {
        await hydrateFAQSideNav(child as NodeType, category);
      }
    }),
  );
}

const FAQSideNav = ({ category, subCategories }: ComponentType & FAQSideNavNode) => {
  if (category === undefined || !subCategories) {
    return null;
  }

  const segments = categorySegments(category);
  const parentSegments = segments.slice(0, -1);
  const parentHref = parentSegments.length ? categoryHref(parentSegments) : FAQ_ROUTE;

  return (
    <nav className="bg-neutral-100 px-4 py-10 sm:py-14" aria-label="FAQ categories">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
        {category && (
          <>
            <Link
              href={parentHref}
              className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-neutral-600 transition hover:bg-neutral-100 hover:text-[#c70101] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c70101]"
            >
              <span aria-hidden="true">←</span>
              Back
            </Link>

            <div className="rounded-xl bg-[#c70101] px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white">
              <span className="sr-only">Current category: </span>
              {categoryLabel(category)}
            </div>
          </>
        )}

        {subCategories.length > 0 && (
          <ul className={category ? "mt-2 grid gap-1" : "grid gap-1"}>
            {subCategories.map((subCategory) => {
              const name = subCategory["@name"];

              return (
                <li key={subCategory["@id"] ?? subCategory["@path"]}>
                  <Link
                    href={categoryHref([...segments, name])}
                    className="flex h-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-red-50 hover:text-[#c70101] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c70101]"
                  >
                    <span>{subCategory.displayName || categoryLabel(name)}</span>
                    <span aria-hidden="true" className="text-[#c70101]">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default FAQSideNav;
