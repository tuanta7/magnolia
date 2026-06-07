import { getAssetUrl, getFooter } from "@/lib/magnolia";
import { FooterChannel } from "./FooterChannel";

const Footer = async ({ path }: FooterProps) => {
  const footer = path ? await getFooter(path) : undefined;

  return (
    <footer className="bg-gray-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex gap-6 min-w-content">
          {footer?.channels?.["@nodes"]?.map((ch) => {
            const channel = footer.channels[ch];
            return (
              <FooterChannel key={channel["@name"]} link={channel.link} iconLink={getAssetUrl(channel.icon["@path"])} />
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full border border-gray-500 text-white hover:bg-gray-700 transition">
            LOG IN
          </button>
          <button className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition">SIGN UP</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
