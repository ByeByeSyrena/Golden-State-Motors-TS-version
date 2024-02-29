import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteItem } from "../../components/FavoriteItem/FavoriteItem";
import { Modal } from "../../components/Modal/Modal";
import { clearFavoritesState } from "../../redux/favorites/favoritesSlice";
import { selectFavorites } from "../../redux/favorites/selectors";
import css from "./FavoritePage.module.css";
import { selectOverallIsLoading } from "../../redux/catalog/selectors";
import { Loader } from "../../components/Loader/Loader";
import { Each } from "../../components/ServiceComponents/Each";
import { Show } from "../../components/ServiceComponents/Show";
import { Item } from "../../redux/catalog/catalogSlice";
import noItemsImage from "../../images/Screenshot_4.png";
import { AppDispatch } from "../../redux/store";

const FavoritePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const favorites: Item[] = useSelector(selectFavorites);
  const isLoading = useSelector(selectOverallIsLoading);

  const openModal = (itemIndex: number) => {
    const selectedItem = favorites[itemIndex];
    setItem(selectedItem);
    setIsOpen(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("body-scroll-lock");
  };

  const handleClearFavorite = () => {
    dispatch(clearFavoritesState());
  };

  return (
    <>
      <section className={css.container}>
        <Show>
          <Show.When isTrue={favorites.length > 0}>
            <button
              type="button"
              className={css.buttonLearnMore}
              onClick={handleClearFavorite}
            >
              Delete All Favorites
            </button>
          </Show.When>
        </Show>
        <ul className={css.layout}>
          <Show>
            <Show.When isTrue={favorites.length > 0}>
              <Each
                of={favorites}
                render={(item, index) => {
                  const carItem = item as Item;
                  return (
                    <FavoriteItem
                      car={carItem}
                      index={index}
                      openModal={openModal}
                      key={carItem.id}
                      id={carItem.id}
                    />
                  );
                }}
              />
            </Show.When>
          </Show>
        </ul>
        <Show.Else>
          <div className={css.imgWrapper}>
            <img className={css.noItems} src={noItemsImage} alt="No items" />
          </div>
        </Show.Else>
        <Show.When isTrue={isLoading}>
          <Loader />
        </Show.When>
        <Show>
          <Show.When isTrue={isOpen}>
            <Modal onClose={closeModal} car={item as Item} />
          </Show.When>
        </Show>
      </section>
    </>
  );
};

export default FavoritePage;
