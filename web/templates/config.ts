import { MagnoliaConfig } from "@magnolia/react-editor";

import {
  Code,
  FAQTopQuestions,
  FlexLayout,
  Footer,
  GridLayout,
  Header,
  Partners,
  Placeholder,
  Posts,
} from "@/templates/components";
import { FAQPage, HomePage, NewsPage, PlayersPage } from "@/templates/pages";

const config: MagnoliaConfig = {
  componentMappings: {
    "manutd-lm:pages/home": HomePage,
    "manutd-lm:pages/players": PlayersPage,
    "manutd-lm:pages/news": NewsPage,

    "manutd-lm:components/layouts/flexLayout": FlexLayout,
    "manutd-lm:components/layouts/gridLayout": GridLayout,

    "manutd-lm:components/code": Code,
    "manutd-lm:components/footer": Footer,
    "manutd-lm:components/header": Header,
    "manutd-lm:components/posts": Posts,
    "manutd-lm:components/partners": Partners,

    "faqs:pages/faq": FAQPage,
    "faqs:components/faqsTopQuestions": FAQTopQuestions,
    "faqs:components/faqsCategoryDetails": Placeholder,
    "faqs:components/faqsSideNav": Placeholder,
  },
};

export default config;
