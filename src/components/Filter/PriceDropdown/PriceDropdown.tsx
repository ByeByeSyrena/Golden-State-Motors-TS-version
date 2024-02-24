import { Each } from "../../ServiceComponents/Each";
import { useEffect, useRef, useState } from "react";
import css from "./PriceDropdown.module.css";
import { FocusableInput } from "../../ServiceComponents/FocusableInput/FocusableInput";
import { FocusableInputRef } from "../../ServiceComponents/FocusableInput/FocusableInput";

type Props = {
  onSelectPrice: (price: number) => void;
};

export const PriceDropdown = ({ onSelectPrice }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const prices = createPrices(0, 200, 10);

  const refPriceInput = useRef<FocusableInputRef>(null);
  const refDropdownInput = useRef<HTMLDivElement>(null);

  const price = document.getElementById("priceInput");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectPrice(Number(e.target.value));
  };

  const handleClick = () => {
    if (!isOpen) {
      refPriceInput.current?.focus();
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside: EventListener = (event) => {
    if (
      refDropdownInput.current &&
      !refDropdownInput.current.contains(event.target as Node)
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

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedPrice = e.currentTarget.textContent || "";
    const adjustToNumber: number = Number(selectedPrice);
    onSelectPrice(adjustToNumber);
    price?.setAttribute("value", selectedPrice);
  };

  return (
    <>
      <div className={css.wrapper}>
        <FocusableInput
          type="number"
          id="priceInput"
          ref={refPriceInput}
          onClick={handleClick}
          onChange={handleChange}
          className={`${css.backspan}`}
        />
        <button onClick={handleClick} className={css.arrowDown}></button>
        <img
          src={require("../../../images/arrow-down.png")}
          alt="arrow-down"
          className={css.arrowDown}
        />
        <span className={css.to}>To $</span>
      </div>
      <div
        className={`${css.optionWrapper} ${isOpen ? css.open : ""}`}
        ref={refDropdownInput}
      >
        <div className={css.scrollWrapper}>
          <Each
            of={prices}
            render={(price, index) => (
              <button
                type="button"
                key={price}
                className={css.option}
                onClick={handleOptionClick}
              >
                {price}
              </button>
            )}
          />
        </div>
      </div>
    </>
  );
};

function createPrices(start: number, end: number, step: number) {
  const array: number[] = [];
  for (let i = start; i <= end; i += step) {
    array.push(i);
  }
  return array;
}
