import React, { useEffect, useState } from "react";
import css from "./Filter.module.css";

import { MakeDropdown } from "../MakeDropdown/MakeDropdown";
import { useDispatch } from "react-redux";
import { PriceDropdown } from "../PriceDropdown/PriceDropdown";
import { setFilterOption } from "../../../redux/catalog/filterSlice";
import { resetFilter } from "../../../redux/catalog/filterSlice";
import { clearState } from "../../../redux/pagedCatalog/catalogSlice";

type Props = {
  onClick: () => void;
  onClearClick: () => void;
};

export const Filter = ({ onClick, onClearClick }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [priceTo, setPriceTo] = useState<number | string>("");
  const [mileageRange, setMileageRange] = useState<number[]>([0, 0]);

  const dispatch = useDispatch();

  const handleCarSelect = (selectedCar: string) => {
    if (selectedCar) {
      const adjust = [...selectedCar.toLowerCase()].slice(1);
      const adjustedString = adjust.join("");
      const selectedAdjusted = selectedCar[0].toUpperCase() + adjustedString;
      setSelectedOption(selectedAdjusted);
    }
  };

  const handlePriceSelect = (selectedPrice: number) => {
    setPriceTo(selectedPrice);
  };

  const handleMileageChange = (index: number, value: number) => {
    setMileageRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = Number(value);
      return newRange;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      setFilterOption({
        make: selectedOption,
        mileage: mileageRange,
        rentalPrice: priceTo,
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(resetFilter());
    setSelectedOption("");
    setPriceTo("");
    setMileageRange([0, 0]);

    dispatch(clearState());

    const leftInputElement = document.getElementById(
      "leftInput"
    ) as HTMLInputElement;

    leftInputElement.value = "";

    const rightInputElement = document.getElementById(
      "rightInput"
    ) as HTMLInputElement;
    rightInputElement.value = "";

    const makeInputElement = document.getElementById(
      "makeInput"
    ) as HTMLInputElement;
    makeInputElement.value = "";

    const priceInputElement = document.getElementById(
      "priceInput"
    ) as HTMLInputElement;
    priceInputElement.value = "";

    onClearClick();
  };

  return (
    <form id="filterForm" onSubmit={handleSubmit} className={css.filterForm}>
      <button
        type="button"
        onClick={handleClearFilters}
        className={css.buttonStyle}
      >
        <span>Clear Filters</span>
      </button>
      <label className={css.label}>
        Car brand
        <MakeDropdown onSelectCar={handleCarSelect} />
      </label>
      <label className={css.label}>
        Price / 1 hour
        <PriceDropdown onSelectPrice={handlePriceSelect} />
      </label>
      <div className={`${css.label}`}>
        <span className={`${css.test}`}>Car mileage / km</span>
        <div className={`${css.labelLayout}`}>
          <span className={css.test2}>From</span>
          <span className={css.test3}>To</span>
          <input
            id="leftInput"
            className={css.leftInput}
            min="0"
            type="number"
            onChange={(e) => handleMileageChange(0, Number(e.target.value))}
          />
          <input
            id="rightInput"
            className={css.rightInput}
            min="0"
            type="number"
            onChange={(e) => handleMileageChange(1, Number(e.target.value))}
          />
        </div>
      </div>
      <button type="submit" className={css.buttonStyle} onClick={onClick}>
        Search
      </button>
    </form>
  );
};
