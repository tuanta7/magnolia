declare type MagnoliaNodeList<T extends NodeType> = NodeType & Record<string, T>;

declare type HeaderSponsorType = NodeType & {
  name?: string;
  logo?: MagnoliaAsset;
  link?: string;
};

declare type HeaderNavLinkType = NodeType & {
  label?: string;
  link?: string;
};

declare type HeaderType = NodeType & {
  name?: string;
  logo?: MagnoliaAsset;
  sponsors?: MagnoliaNodeList<HeaderSponsorType>;
  navLinks?: MagnoliaNodeList<HeaderNavLinkType>;
};

declare type PartnerType = NodeType & {
  name?: string;
  logo?: MagnoliaAsset;
  link?: string;
};

declare type PartnersType = NodeType & {
  name?: string;
  principalPartners?: MagnoliaNodeList<PartnerType>;
  globalPartners?: MagnoliaNodeList<PartnerType>;
};

declare type PostType = NodeType & {
  name?: string;
  title?: string;
  category?: string;
  thumbnail?: MagnoliaAsset;
  createdAt?: string;
  redirectLink?: string;
  body?: string;
};

declare type PostsType = NodeType & Record<string, PostType>;

declare type NewsListingNavLinkType = NodeType & {
  label?: string;
  link?: string;
};

declare type PostListProps = NodeType & {
  title?: string;
  subtitle?: string;
  heroImage?: MagnoliaAsset;
  navLinks?: MagnoliaNodeList<NewsListingNavLinkType>;
};

declare type HeaderProps = {
  path?: string;
  header?: string | NodeType;
};

declare type PartnersProps = {
  partners?: string | NodeType;
};
