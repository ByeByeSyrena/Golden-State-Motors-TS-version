import React from "react";

type RenderFunction = (item: string | number, index: number) => React.ReactNode;

type Props = {
  render: RenderFunction;
  of: string[] | number[];
};

export const Each = ({ render, of }: Props) => {
  return (
    <>{Array.isArray(of) && of.map((item, index) => render(item, index))}</>
  );
};
