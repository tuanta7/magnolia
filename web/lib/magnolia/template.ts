import { environments } from "../environments";

async function getTemplateAnnotations(path: string, search = ""): Promise<TemplateAnnotationsType> {
  const url = `${environments.mgnlTemplates}${path}${search}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch template annotations at ${url}`);
  }

  return await res.json();
}

export { getTemplateAnnotations };
