import { MagnoliaConfig } from "@magnolia/react-editor";
import { Footer, Code, Header, Partners, Posts, FlexLayout, TwoColumnsLayout } from "@/templates/components";
import { HomePage, PlayersPage, NewsPage } from "@/templates/pages";

const config: MagnoliaConfig = {
  componentMappings: {
    "manutd-lm:pages/home": HomePage,
    "manutd-lm:pages/players": PlayersPage,
    "manutd-lm:pages/news": NewsPage,

    "manutd-lm:components/code": Code,
    "manutd-lm:components/footer": Footer,
    "manutd-lm:components/header": Header,
    "manutd-lm:components/posts": Posts,
    "manutd-lm:components/partners": Partners,

    "manutd-lm:components/layouts/flexLayout": FlexLayout,
    "manutd-lm:components/layouts/twoColumnsLayout": TwoColumnsLayout,
  },
};

export default config;
