function getRequiredEnv(name: string, rawValue: string | undefined): string {
  const value = rawValue?.trim();

  // only throw error on server
  if (typeof window === "undefined" && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value || "";
}

function getBooleanEnv(rawValue: string | undefined): boolean {
  return rawValue?.trim().toLowerCase() === "true";
}

const MGNL_HOST = getRequiredEnv("MGNL_HOST", process.env.MGNL_HOST);

const MGNL_BASE = getBooleanEnv(process.env.MGNL_IS_PREVIEW)
  ? getRequiredEnv("MGNL_BASE_AUTHOR", process.env.MGNL_BASE_AUTHOR)
  : getRequiredEnv("MGNL_BASE_PUBLIC", process.env.MGNL_BASE_PUBLIC);

const MGNL_URL = `${MGNL_HOST}${MGNL_BASE}`;

const MGNL_SITE_PATH = getRequiredEnv("MGNL_SITE_PATH", process.env.MGNL_SITE_PATH);
const MGNL_LANGUAGES = getRequiredEnv("MGNL_LANGUAGES", process.env.MGNL_LANGUAGES);

export const environments = {
  mgnlSitePath: MGNL_SITE_PATH,
  mgnlLanguages: MGNL_LANGUAGES.split(" "),
  mgnlTemplates: `${MGNL_URL}/.rest/template-annotations/v1`,
  mgnlPages: `${MGNL_URL}/.rest/delivery/v1/pages`,
  mgnlPosts: `${MGNL_URL}/.rest/delivery/v1/posts`,
  mgnlHeaders: `${MGNL_URL}/.rest/delivery/v1/headers`,
  mgnlFooters: `${MGNL_URL}/.rest/delivery/v1/footers`,
  mgnlPartners: `${MGNL_URL}/.rest/delivery/v1/partners`,
  mgnlFAQs: `${MGNL_URL}/.rest/delivery/faqs`,
  mgnlFAQsCategories: `${MGNL_URL}/.rest/delivery/categories`,
  mgnlAssets: `${MGNL_URL}/dam`,
};
