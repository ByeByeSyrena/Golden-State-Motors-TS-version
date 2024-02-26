import React, { useEffect, useState } from "react";
import css from "./InventoryItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites } from "../../redux/favorites/favoritesSlice";
// import { ReactComponent as Heart } from "../../images/heart.svg";
import { selectFavorites } from "../../redux/favorites/selectors";
import { deleteFavorites } from "../../redux/favorites/favoritesSlice";

import { Item } from "../../redux/catalog/catalogSlice";

type Props = {
  car: Item;
  index: number;
  openModal: (index: number) => void;
};

export const InventoryItem = ({ car, index, openModal }: Props) => {
  const dispatch = useDispatch();

  const [isSelected, setSelected] = useState(false);

  const favorites = useSelector(selectFavorites);

  const handleToggleFavorite = () => {
    if (isSelected) {
      dispatch(deleteFavorites(car.id));
    } else {
      dispatch(addFavorites(car));
    }
    setSelected(!isSelected);
  };

  useEffect(() => {
    setSelected(favorites.some((favorite: Item) => favorite.id === car.id));
  }, [favorites, car]);

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

  const arrayAddress = splitAddress(car);

  return (
    <li key={car.id} className={css.wrapper}>
      <div className={css.wrap}>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={css.starButton}
        >
          Click
          {/* <Heart className={` ${isSelected ? css.starred : css.star}`} /> */}
        </button>
        {car.img ? (
          <img
            src={car.img}
            alt={car.make}
            className={css.image}
            style={{ objectFit: "cover" }}
          />
        ) : (
          "No image"
        )}
        <div className={css.modelPrice}>
          <p>
            {car.make} <span className={css.modelPricePart}>{car.model}</span>,{" "}
            {car.year}
          </p>
          <p>{car.rentalPrice}</p>
        </div>
        <div className={css.modelFeatures}>
          <p className={css.genInfo}>{arrayAddress[0]}</p>
          <span className={css.line}></span>
          <p className={css.genInfo}>{arrayAddress[1]}</p>
          <span className={css.line}></span>
          <p className={css.genInfo}>{car.rentalCompany}</p>
          <span className={css.line}></span>
          <p className={css.genInfo}>{car.type}</p>
          <span className={css.line}></span>
          <p className={css.genInfo}>{car.model}</p>
          <span className={css.line}></span>
          <p className={css.genInfo}>
            {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <span className={css.line}></span>
          <p className={css.genInfo}>
            {car.accessories[car.accessories.length - 1]}
          </p>
        </div>
      </div>
      <button
        type="button"
        className={css.buttonLearnMore}
        onClick={() => openModal(index)}
      >
        Learn more
      </button>
    </li>
  );
};
