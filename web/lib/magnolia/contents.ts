import { environments } from "../environments";

async function getPage(path: string, search = ""): Promise<PageType> {
  const url = `${environments.mgnlPages}${path}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch page at ${url}`);
  }

  return await res.json();
}

async function getFooter(path: string, search = ""): Promise<FooterType> {
  const url = `${environments.mgnlFooters}${path}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch footer at ${url}`);
  }

  return await res.json();
}

export { getPage, getFooter };
