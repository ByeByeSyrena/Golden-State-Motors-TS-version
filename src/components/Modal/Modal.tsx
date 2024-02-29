import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { ReactComponent as CloseIcon } from "../../images/cross.svg";
import { Item } from "../../redux/catalog/catalogSlice";

type Props = {
  onClose: () => void;
  car: Item;
};

const modalRoot: Element | null = document.getElementById("modal-root");

export function Modal({ onClose, car }: Props) {
  useEffect(() => {
    if (!modalRoot) {
      throw new Error("Cannot find modal root element");
    }
  }, []);

  function splitAddress(car: Item) {
    let country;
    let city;

    if (car) {
      const address = car.address.split(" ");
      country = address[address.length - 1];
      city = address[address.length - 2].replace(/,/g, "");
      return [city, country];
    }

    return [];
  }

  const rentalConditions = () => {
    if (car) {
      const rentalConditionsArray = car ? car.rentalConditions.split("\n") : [];

      const ageSplit = rentalConditionsArray[0].split(" ");
      const age = ageSplit[ageSplit.length - 1];

      return [age, rentalConditionsArray[1], rentalConditionsArray[2]];
    }
    return [];
  };

  const arrayAddress = splitAddress(car);

  const backdropRef = useRef(null);

  useEffect(() => {
    const handleKeyDown: EventListener = (event) => {
      if ((event as KeyboardEvent).code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event && event.target === event.currentTarget) {
      onClose();
    }
  };

  const {
    make,
    model,
    year,
    type,
    id,
    fuelConsumption,
    engineSize,
    functionalities,
    accessories,
  } = car;

  const accessoriesAndFunctionalities = () => {
    if (car && functionalities && accessories) {
      const accessoriesAndFunctionalities = functionalities.concat(accessories);

      return accessoriesAndFunctionalities;
    }

    return [];
  };

  return createPortal(
    car && (
      <div
        className={css.backdrop}
        ref={backdropRef}
        onClick={handleBackdropClick}
      >
        <div className={css.modal}>
          <div className={css.crossWrapper}>
            <button type="button" onClick={onClose} className={css.cross}>
              <CloseIcon className={css.animCross} />
            </button>
          </div>
          <div className={css.contentWrapper}>
            <img src={car.img} alt={make} className={css.image} />
            <h1 className={css.title}>
              {make} <span className={css.titlePeace}>{model}</span>, {year}
            </h1>

            <div className={css.generalInfoWrapper}>
              <p className={css.genInfo}>{arrayAddress[0]}</p>
              <span className={css.line}></span>
              <p className={css.genInfo}>{arrayAddress[1]}</p>
              <span className={css.line}></span>
              <p className={css.genInfo}>Id: {id}</p>
              <span className={css.line}></span>
              <p className={css.genInfo}>Year: {year}</p>
              <span className={css.line}></span>
              <p className={css.genInfo}>Type: {type}</p>
              <span className={css.line}></span>
            </div>
            <div className={css.generalInfoWrapper}>
              <p className={css.genInfo}>Fuel Consumption: {fuelConsumption}</p>
              <span className={css.line}></span>
              <p className={css.genInfo}>Engine Size: {engineSize}</p>
            </div>

            <p className={css.description}>{car.description}</p>
            <h4 className={css.accessor}>Accessories and functionalities</h4>
            <div className={css.addInfoDiv}>
              {accessoriesAndFunctionalities().map((item, index) => (
                <span key={index}>
                  <span className={css.genInfo}>{item}</span>
                  {index !== accessoriesAndFunctionalities.length - 1 && (
                    <span className={css.line}></span>
                  )}
                </span>
              ))}
            </div>
            <h4 className={css.rentalConditions}>Rental Conditions</h4>
            <div className={css.lastWrapper}>
              <span className={css.roundedSpan}>
                Minimum age:{" "}
                <span className={css.blue}>{rentalConditions()[0]}</span>{" "}
              </span>
              <span className={css.roundedSpan}>{rentalConditions()[1]}</span>
              <span className={css.roundedSpan}>{rentalConditions()[2]}</span>
              <span className={css.roundedSpan}>
                Mileage:{" "}
                <span className={css.blue}>
                  {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </span>
              <span className={`${css.roundedSpan} ${css.blue}`}>
                {`${car.rentalPrice}`.slice(1)}$
              </span>
            </div>
            <div className={css.rentalCarButton}>
              <a href="tel:+380730000000" className={css.rentalCarText}>
                Rental Car
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
    modalRoot || document.body
  );
}
