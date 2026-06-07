declare type FooterLinkType = NodeType & {
  label?: string;
  link: string;
  icon?: NodeType;
  name: string;
};

declare type FooterChannelType = FooterLinkType;

declare type FooterChannels = NodeType & Record<string, FooterChannelType>;
declare type FooterLinks = NodeType & Record<string, FooterLinkType>;

declare type FooterType = NodeType & {
  name: string;
  logo?: NodeType;
  channels?: FooterChannels;
  links?: FooterLinks;
  legalLinks?: FooterLinks;
  appLinks?: FooterLinks;
  copyright?: string;
};

declare type FooterProps = {
  path?: string;
  footer?: string | NodeType;
};
