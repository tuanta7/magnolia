import { ReactNode } from "react";

type GridLayoutProps = {
  colNumber: number;
};

const GridLayout = ({ colNumber }: GridLayoutProps) => {
  const contents: ReactNode[] = [];
  for (let i = 0; i < colNumber; i++) {
    contents.push();
  }

  return <div className="">{contents};</div>;
};

export default GridLayout;
