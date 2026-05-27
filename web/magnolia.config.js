import { Footer, Code, FlexLayout, TwoColumnsLayout } from "@/components";
import { HomePage, PlayersPage } from "@/templates/pages";

const config = {
  componentMappings: {
    "manutd-lm:pages/home": HomePage,
    "manutd-lm:pages/players": PlayersPage,

    "manutd-lm:components/code": Code,
    "manutd-lm:components/footer": Footer,

    "manutd-lm:components/layouts/flexLayout": FlexLayout,
    "manutd-lm:components/layouts/twoColumnsLayout": TwoColumnsLayout,
  },
};

export default config;
