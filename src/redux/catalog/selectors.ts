import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAllCars = (state: RootState) => state.catalog.items;

export const selectLoader = (state: RootState) => state.catalog.isLoading;

export const selectFilterState = (state: RootState) => state.filter;

export const selectCatalogState = (state: RootState) => state.catalog;

export const selectFilteredCars = createSelector(
  [selectCatalogState, selectFilterState],
  (catalogState, filterState) => {
    const { items } = catalogState;
    const { make, mileage, rentalPrice } = filterState;
    const from = typeof mileage === "number" ? mileage : mileage[0];
    const to = typeof mileage === "number" ? mileage : mileage[1];

    const filteredCars = items.filter((car) => {
      let isMatch = true;

      if (make && car.make !== make) {
        isMatch = false;
      }

      if (mileage && (from || to)) {
        if ((from && car.mileage < from) || (to && car.mileage > to)) {
          isMatch = false;
        }
      }

      if (
        rentalPrice &&
        parseInt(car.rentalPrice.replace(/\$/g, "")) > Number(rentalPrice)
      ) {
        isMatch = false;
      }

      return isMatch;
    });

    return filteredCars;
  }
);

export const selectIsLoadingPagedCatalog = (state: RootState) =>
  state.pagedCatalog.isLoading;
export const selectIsLoadingCatalog = (state: RootState) =>
  state.catalog.isLoading;

export const selectOverallIsLoading = createSelector(
  [selectIsLoadingPagedCatalog, selectIsLoadingCatalog],
  (isLoadingPagedCatalog, isLoadingCatalog) =>
    isLoadingPagedCatalog || isLoadingCatalog
);
