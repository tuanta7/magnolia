import Image from "next/image";

import { resolveAssetURL } from "@/lib/magnolia/assets";
import { nodeList, resolvePath } from "@/lib/magnolia/helpers";
import { getPartners } from "@/lib/magnolia/template";

function assetUrl(asset?: NodeType | string) {
  return resolveAssetURL(resolvePath(asset));
}

function PartnerLogo({ partner }: { partner: PartnerType }) {
  const logo = assetUrl(partner.logo);
  const content = logo ? (
    <Image src={logo} alt={partner.name || ""} className="max-h-12 w-auto object-contain" height={100} width={100} />
  ) : (
    <span className="text-sm font-semibold uppercase text-neutral-700">{partner.name}</span>
  );

  if (!partner.link) {
    return <div className="flex h-20 items-center justify-center px-6">{content}</div>;
  }

  return (
    <a
      href={partner.link}
      target={partner.link.startsWith("http") ? "_blank" : undefined}
      rel={partner.link.startsWith("http") ? "noreferrer" : undefined}
      className="flex h-20 items-center justify-center px-6 transition hover:bg-neutral-100"
    >
      {content}
    </a>
  );
}

const Partners = async ({ partners }: PartnersProps) => {
  const partnersPath = resolvePath(partners);
  const data = partnersPath ? await getPartners(partnersPath) : undefined;
  const principalPartners = nodeList<PartnerType>(data?.principalPartners);
  const globalPartners = nodeList<PartnerType>(data?.globalPartners);

  if (!principalPartners.length && !globalPartners.length) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        {!!principalPartners.length && (
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-normal text-neutral-500">
              Principal Partners
            </h2>
            <div className="mt-4 grid grid-cols-2 divide-x divide-neutral-200 overflow-hidden rounded border border-neutral-200 md:grid-cols-4">
              {principalPartners.map((partner) => (
                <PartnerLogo key={partner["@name"]} partner={partner} />
              ))}
            </div>
          </div>
        )}
        {!!globalPartners.length && (
          <div className="pt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-normal text-neutral-500">
              Global Partners
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded bg-neutral-200 md:grid-cols-4 lg:grid-cols-6">
              {globalPartners.map((partner) => (
                <div key={partner["@name"]} className="bg-white">
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
