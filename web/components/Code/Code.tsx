export interface CodeProps {
  html: string;
  css?: string;
  nonce?: string;
}

function decodeHtmlEntities(html: string) {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, codePoint: string) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, codePoint: string) => String.fromCodePoint(Number.parseInt(codePoint, 16)));
}

const Code = ({ html, css, nonce }: CodeProps) => {
  if (!html) {
    return <p>No code provided</p>;
  }

  const decodedHtml = decodeHtmlEntities(html);
  return (
    <>
      {css && <style nonce={nonce}>{css}</style>}
      <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
    </>
  );
};

export default Code;
