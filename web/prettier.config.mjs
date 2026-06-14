import sortImports from "@trivago/prettier-plugin-sort-imports";

/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  singleQuote: false,
  plugins: [sortImports],
  importOrder: [
    "^(react|react-dom|next)(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./].*(?<!\\.(c|le|sc)ss)$",
    "^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
