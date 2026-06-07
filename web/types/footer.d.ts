declare type FooterChannelType = NodeType & {
  link: string;
  icon: NodeType;
  name: string;
};

declare type FooterChannels = NodeType & Record<string, FooterChannelType>;

declare type FooterType = NodeType & {
  name: string;
  channels: FooterChannels;
};

declare type FooterProps = {
  path?: string;
};
