import React from "react";
import { Item } from "../../redux/catalog/catalogSlice";

type RenderFunction = (
  item: string | number | Item,
  index: number
) => React.ReactNode;

type Props = {
  render: RenderFunction;
  of: (string | number | Item)[];
};

export const Each = ({ render, of }: Props) => {
  return <>{of.map((item, index) => render(item, index))}</>;
};
