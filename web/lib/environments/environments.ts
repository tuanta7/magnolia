function getRequiredEnv(name: string, rawValue: string | undefined): string {
  const value = rawValue?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getBooleanEnv(rawValue: string | undefined): boolean {
  return rawValue?.trim().toLowerCase() === "true";
}

const MGNL_BASE = getBooleanEnv(process.env.MGNL_IS_PREVIEW)
  ? getRequiredEnv("MGNL_BASE_AUTHOR", process.env.MGNL_BASE_AUTHOR)
  : getRequiredEnv("MGNL_BASE_PUBLIC", process.env.MGNL_BASE_PUBLIC);

const MGNL_HOST = getRequiredEnv("MGNL_HOST", process.env.MGNL_HOST);
const MGNL_URL = `${MGNL_HOST}${MGNL_BASE}`;

const MGNL_DELIVERY_BASE = `${MGNL_URL}/.rest/delivery/v1`;
const MGNL_SITE_PATH = getRequiredEnv("MGNL_SITE_PATH", process.env.MGNL_SITE_PATH);
const MGNL_LANGUAGES = getRequiredEnv("MGNL_LANGUAGES", process.env.MGNL_LANGUAGES);

const MGNL_API_ASSETS = getRequiredEnv("MGNL_API_ASSETS", process.env.MGNL_API_ASSETS);
const MGNL_API_TEMPLATES = getRequiredEnv("MGNL_API_TEMPLATES", process.env.MGNL_API_TEMPLATES);
const MGNL_API_PAGES = getRequiredEnv("MGNL_API_PAGES", process.env.MGNL_API_PAGES);
const MGNL_API_FOOTERS = getRequiredEnv("MGNL_API_FOOTERS", process.env.MGNL_API_FOOTERS);

export const environments = {
  mgnlSitePath: MGNL_SITE_PATH,
  mgnlLanguages: MGNL_LANGUAGES.split(" "),
  mgnlAssets: `${MGNL_URL}${MGNL_API_ASSETS}`,
  mgnlTemplates: `${MGNL_URL}${MGNL_API_TEMPLATES}`,
  mgnlPages: `${MGNL_URL}${MGNL_API_PAGES}`,
  mgnlFooters: `${MGNL_URL}${MGNL_API_FOOTERS}`,
  mgnlPosts: `${MGNL_DELIVERY_BASE}/posts`,
  mgnlHeaders: `${MGNL_DELIVERY_BASE}/headers`,
  mgnlPartners: `${MGNL_DELIVERY_BASE}/partners`,
};
