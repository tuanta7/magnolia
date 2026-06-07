import { getAssetUrl } from "@/lib/magnolia";

function assetUrl(asset?: MagnoliaAsset | string) {
  if (!asset) {
    return undefined;
  }

  return getAssetUrl(typeof asset === "string" ? asset : asset["@path"]);
}

function formatDate(value?: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function externalLinkProps(link?: string) {
  if (!link?.startsWith("http")) {
    return {};
  }

  return { target: "_blank", rel: "noreferrer" };
}

const Post = ({ post }: { post: PostType }) => {
  const thumbnail = assetUrl(post.thumbnail);
  const createdAt = post.createdAt || post["mgnl:created"];

  return (
    <article className="overflow-hidden rounded bg-white shadow-sm">
      <a href={post.redirectLink || "#"} {...externalLinkProps(post.redirectLink)} className="block">
        <div className="aspect-[16/9] bg-neutral-300">
          {thumbnail && <img src={thumbnail} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase text-neutral-500">
            <span>{post.category || "News"}</span>
            <time dateTime={typeof createdAt === "string" ? createdAt : undefined}>{formatDate(createdAt)}</time>
          </div>
          <h2 className="mt-3 min-h-16 text-lg font-extrabold leading-tight text-neutral-950">{post.title}</h2>
        </div>
      </a>
    </article>
  );
};

export default Post;
