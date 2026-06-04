export async function GET() {
  // TODO: Implement robots in Magnolia and fetch content here.
  const robots = `User-agent: * \nAllow: /\n`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
