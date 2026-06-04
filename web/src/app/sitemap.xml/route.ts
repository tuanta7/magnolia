const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
};

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:3000/manutd</loc>
  </url>
  <url>
    <loc>http://localhost:3000/manutd/players</loc>
  </url>
</urlset>`;

  return new Response(body, {
    headers: XML_HEADERS,
  });
}
