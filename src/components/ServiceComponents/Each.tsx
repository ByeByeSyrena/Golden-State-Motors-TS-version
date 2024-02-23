import React from "react";

type RenderFunction = (item: string, index: number) => React.ReactNode;

type Props = {
  render: RenderFunction;
  of: string[];
};

export const Each = ({ render, of }: Props) => {
  return (
    <>{Array.isArray(of) && of.map((item, index) => render(item, index))}</>
  );
};
