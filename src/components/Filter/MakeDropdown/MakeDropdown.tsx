import React, { useEffect, useRef, useState } from "react";
import data from "../../../data/makes.json";
import css from "./MakeDropdown.module.css";
import { v4 as uuidv4 } from "uuid";
// import { FocusableInput } from "../../ServiceComponents/FocusableInput/FocusableInput";
// import { FocusableInputRef } from "../../ServiceComponents/FocusableInput/FocusableInput";
import { Each } from "../../ServiceComponents/Each";

type Props = {
  onSelectCar: (car: string) => void;
};

export const MakeDropdown = ({ onSelectCar }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredDropdown, setFilteredDropdown] = useState<string[]>([]);

  const make = document.getElementById("makeInput") as HTMLInputElement;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    onSelectCar(inputValue);
    const filteredCars = data.filter(
      (car) =>
        inputValue.length &&
        car.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredDropdown(filteredCars);
  };

  const handleClick = () => {
    if (!isOpen) {
      inputRef.current?.focus();
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const selectedCar = target.textContent;
    if (selectedCar) {
      onSelectCar(selectedCar);
      make.value = target.textContent || "";
      setSearch("");
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.makeDiv}>
        <input
          id="makeInput"
          ref={inputRef}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="Enter the text"
          type="text"
          className={css.makeInput}
        />
        <button type="button" onClick={handleClick} className={css.arrowDown}>
          <img
            src={require("../../../images/arrow-down.png")}
            alt="arrow-down"
          />
        </button>
      </div>
      <div
        ref={dropdownRef}
        className={`${css.optionWrapper} ${isOpen ? css.open : ""}`}
      >
        <div className={css.scrollWrapper}>
          {search ? (
            <Each
              of={filteredDropdown}
              render={(car, index) => (
                <button
                  key={uuidv4()}
                  className={css.option}
                  onClick={handleOptionClick}
                >
                  {car as string}
                </button>
              )}
            />
          ) : (
            <Each
              of={data}
              render={(car, index) => (
                <button
                  key={uuidv4()}
                  className={css.option}
                  onClick={handleOptionClick}
                >
                  {car as string}
                </button>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
