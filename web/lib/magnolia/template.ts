import { environments } from "../environments";
import { normalizedPath } from "./helpers";

async function getTemplateAnnotations(path: string, search = ""): Promise<TemplateAnnotationsType> {
  const url = `${environments.mgnlTemplates}${path}${search}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch template annotations at ${url}`);
  }

  return await res.json();
}

async function getPage(path: string, search = ""): Promise<PageType> {
  const url = `${environments.mgnlPages}${normalizedPath(path)}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch page at ${url}`);
  }

  return await res.json();
}

async function getFAQs(path = "", search = ""): Promise<FAQListType> {
  const url = `${environments.mgnlFaqs}${normalizedPath(path)}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch FAQs at ${url}`);
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

async function getHeader(path: string, search = ""): Promise<HeaderType> {
  const url = `${environments.mgnlHeaders}${path}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch header at ${url}`);
  }

  return await res.json();
}

async function getPartners(path: string, search = ""): Promise<PartnersType> {
  const url = `${environments.mgnlPartners}${path}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch partners at ${url}`);
  }

  return await res.json();
}

async function getPosts(search = ""): Promise<PostsType> {
  const url = `${environments.mgnlPosts}${search}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts at ${url}`);
  }

  return await res.json();
}

export { getTemplateAnnotations, getPage, getFooter, getHeader, getPartners, getPosts, getFAQs };
