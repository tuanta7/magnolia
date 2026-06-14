import Link from "next/link";

import { getAssetUrl, getHeader, path as getPath } from "@/lib/magnolia";
import { nodeList } from "@/lib/magnolia/nodeList";

function assetUrl(asset?: MagnoliaAsset | string) {
  if (!asset) {
    return undefined;
  }

  return getAssetUrl(typeof asset === "string" ? asset : asset["@path"]);
}

function linkProps(link?: string) {
  if (!link) {
    return {};
  }

  return link.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

const Header = async ({ header }: HeaderProps) => {
  const headerPath = getPath(header);
  const data = headerPath ? await getHeader(headerPath) : undefined;
  const sponsors = nodeList<HeaderSponsorType>(data?.sponsors);
  const navLinks = nodeList<HeaderNavLinkType>(data?.navLinks);
  const logo = assetUrl(data?.logo);

  return (
    <header className="bg-[#c70101] text-white">
      <div className="bg-black px-4 py-3 text-[#1f1f1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 overflow-x-auto">
          {sponsors.map((sponsor) => {
            const sponsorLogo = assetUrl(sponsor.logo);

            return (
              <a
                key={sponsor["@name"]}
                href={sponsor.link || "#"}
                {...linkProps(sponsor.link)}
                className="flex min-w-fit items-center gap-2 text-xs font-semibold uppercase tracking-normal text-neutral-700"
              >
                {sponsorLogo && (
                  <img src={sponsorLogo} alt={sponsor.name || ""} className="h-7 w-auto object-contain" />
                )}
                {!sponsorLogo && sponsor.name}
              </a>
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
        <Link href="/en" className="flex min-w-fit items-center gap-3">
          {logo && <img src={logo} alt={data?.name || "Manchester United"} className="h-14 w-auto object-contain" />}
          <span className="text-lg font-bold uppercase tracking-normal">Manchester United</span>
        </Link>
        <nav className="flex flex-1 items-center gap-5 overflow-x-auto text-sm font-bold uppercase">
          {navLinks.map((item) => (
            <a key={item["@name"]} href={item.link || "#"} className="min-w-fit hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
