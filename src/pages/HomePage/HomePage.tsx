import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Filter } from '../../components/Filter/Filter/Filter';
// import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton';
// import { Modal } from '../../components/Modal/Modal';
import { selectItems, selectPage } from "../../redux/pagedCatalog/selectors";
import { getCars } from "../../redux/pagedCatalog/operations";
import css from "./HomePage.module.css";
import { addPage, clearState } from "../../redux/pagedCatalog/catalogSlice";
import {
  selectFilteredCars,
  selectOverallIsLoading,
} from "../../redux/catalog/selectors";
import { getAllCars } from "../../redux/catalog/operations";
// import { Loader } from 'components/Loader/Loader';
// import NotFound from 'components/NotFound/NotFound';
import { Each } from "../../components/ServiceComponents/Each";
import { Show } from "../../components/ServiceComponents/Show";
import { InventoryItem } from "../../components/InventoryItem/InventoryItem";
import { Item } from "../../redux/catalog/catalogSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Item | string>("");

  const [shouldRenderArray1, setArray1] = useState<boolean>(true);

  const cars = useSelector(selectItems);
  const page = useSelector(selectPage);
  const filteredCars = useSelector(selectFilteredCars);
  const isLoading = useSelector(selectOverallIsLoading);

  const openModal = (itemIndex: number) => {
    const selectedItem = cars[itemIndex];
    setItem(selectedItem);
    setIsOpen(true);
    document.body.classList.add("body-scroll-lock");
  };

  // const closeModal = () => {
  //   setIsOpen(false);
  //   document.body.classList.remove('body-scroll-lock');
  // };

  const arrayToRender = shouldRenderArray1 ? cars : filteredCars;

  useEffect(() => {
    dispatch(clearState());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCars({ page }));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(addPage());
  };

  const handleFilter = () => {
    dispatch(getAllCars());
    setArray1(false);
  };

  const handleClearFilter = () => {
    setArray1(true);
    dispatch(clearState());
    dispatch(getCars({ page }));
  };

  return (
    <>
      <section className={css.container}>
        {/* <Filter onClick={handleFilter} onClearClick={handleClearFilter} /> */}
        <Show>
          {/* <Show.When isTrue={isLoading}>
            <Loader />
          </Show.When>

          <Show.When isTrue={!isLoading && arrayToRender.length === 0}>
            <NotFound className={css.noResults} />
          </Show.When> */}

          <ul className={css.layout}>
            <Show.When isTrue={arrayToRender.length > 0}>
              <Each
                of={arrayToRender}
                render={(item, index) => {
                  if (typeof item === "object" && item !== null) {
                    return (
                      <InventoryItem
                        car={item as Item}
                        index={index}
                        openModal={openModal}
                        key={(item as Item).id}
                      />
                    );
                  } else {
                    return null;
                  }
                }}
              />
            </Show.When>
          </ul>
        </Show>
        {/* <Show>
          <Show.When
            isTrue={
              !isLoading &&
              arrayToRender.length !== 0 &&
              arrayToRender.length <= 32
            }
          >
            <LoadMoreButton text="Load more" onClick={handleLoadMore} />
          </Show.When>
        </Show>
        <Show>
          <Show.When isTrue={isOpen}>
            <Modal onClose={closeModal} car={item} />
          </Show.When>
        </Show> */}
      </section>
    </>
  );
};

export default HomePage;
