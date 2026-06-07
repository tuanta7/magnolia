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

export { getPage, getFooter, getHeader, getPartners, getPosts };
