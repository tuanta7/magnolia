import Image from "next/image";

import { resolveAssetURL } from "@/lib/magnolia/assets";
import { nodeList, resolvePath } from "@/lib/magnolia/helpers";
import { getFooter } from "@/lib/magnolia/template";

const Footer = async ({ path, footer: footerReference }: FooterProps) => {
  const footerPath = resolvePath(footerReference);
  const footer = footerPath ? await getFooter(footerPath) : undefined;
  const logo = resolveAssetURL(resolvePath(footer?.logo));
  const channels = nodeList<FooterChannelType>(footer?.channels);
  const links = nodeList<FooterLinkType>(footer?.links);
  const legalLinks = nodeList<FooterLinkType>(footer?.legalLinks);
  const appLinks = nodeList<FooterLinkType>(footer?.appLinks);

  return (
    <footer className="bg-neutral-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            {logo && (
              <Image
                src={logo}
                alt={footer?.name || ""}
                className="h-16 w-auto object-contain"
                height={100}
                width={100}
              />
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {channels.map((channel) => {
                const icon = resolveAssetURL(getPath(channel.icon));

                return (
                  <a
                    key={channel["@name"]}
                    href={channel.link || "#"}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                    aria-label={channel.name}
                  >
                    {icon && <Image src={icon} alt="" className="h-5 w-5 object-contain" height={100} width={100} />}
                    {!icon && <span className="text-xs font-bold">{channel.name?.slice(0, 1)}</span>}
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="grid gap-3 text-sm font-bold uppercase text-neutral-200 sm:grid-cols-2 md:grid-cols-3">
            {links.map((item) => (
              <a key={item["@name"]} href={item.link || "#"} className="hover:text-white hover:underline">
                {item.label || item.name}
              </a>
            ))}
          </nav>
        </div>

        {!!appLinks.length && (
          <div className="flex flex-wrap items-center py-3">
            {appLinks.map((item) => {
              const icon = resolveAssetURL(getPath(item.icon));

              return (
                <a
                  key={item["@name"]}
                  href={item.link || "#"}
                  className="flex items-center gap-3 rounded text-sm font-bold uppercase hover:bg-white/10"
                >
                  {icon && <Image src={icon} alt="" className="w-full h-12 object-contain" width={100} height={100} />}
                  {item.label || item.name}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-4 pt-6 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2 uppercase">
            {legalLinks.map((item) => (
              <a key={item["@name"]} href={item.link || "#"} className="hover:text-white hover:underline">
                {item.label || item.name}
              </a>
            ))}
          </div>
          {footer?.copyright && <p>{footer.copyright}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
