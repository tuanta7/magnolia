import { resolveAssetURL } from "@/lib/magnolia/assets";
import { nodeList, resolvePath } from "@/lib/magnolia/helpers";
import { getPosts } from "@/lib/magnolia/template";

import Post from "./Post";

function assetUrl(asset?: NodeType | string) {
  return resolveAssetURL(resolvePath(asset));
}

const PostList = async ({ title, subtitle, heroImage, navLinks }: PostListProps) => {
  const posts = await getPosts();
  const items = nodeList<PostType>(posts)
    .filter((post) => post.title)
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || "").getTime();
      const bDate = new Date(b.createdAt || "").getTime();

      return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
    });
  const navItems = nodeList<NewsListingNavLinkType>(navLinks);
  const hero = assetUrl(heroImage);

  return (
    <main className="bg-neutral-100">
      <section className="relative min-h-[340px] bg-neutral-950 text-white">
        {hero && <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative mx-auto flex min-h-[340px] max-w-7xl flex-col justify-end px-4 py-10">
          <p className="text-sm font-bold uppercase tracking-normal text-red-300">News</p>
          <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-normal md:text-6xl">
            {title || "Men's News"}
          </h1>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-neutral-100 md:text-lg">{subtitle}</p>}
        </div>
      </section>

      <nav className="border-b border-neutral-300 bg-white">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 text-sm font-bold uppercase text-neutral-700">
          {(navItems.length
            ? navItems
            : [{ "@name": "mens-news", label: "Men's News", link: "#" } as NewsListingNavLinkType]
          ).map((item) => (
            <a
              key={item["@name"]}
              href={item.link || "#"}
              className="min-w-fit border-b-4 border-transparent py-4 hover:border-red-700 hover:text-red-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <Post key={post["@id"] || post["@path"]} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostList;
