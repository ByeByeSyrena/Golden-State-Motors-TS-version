import { createSelector } from '@reduxjs/toolkit';

export const selectAllCars = state => state.catalog.items;

export const selectFilterOption = state => state.filter.selectedOption;

export const selectLoader = state => state.catalog.isLoading;

export const selectFilterState = state => state.filter;

export const selectCatalogState = state => state.catalog;

export const selectFilteredCars = createSelector(
  [selectCatalogState, selectFilterState],
  (catalogState, filterState) => {
    const { items } = catalogState;
    const { make, mileage, rentalPrice } = filterState;
    const from = mileage[0];
    const to = mileage[1];

    const filteredCars = items.filter(car => {
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
        parseInt(car.rentalPrice.replace(/\$/g, '')) > rentalPrice
      ) {
        isMatch = false;
      }

      return isMatch;
    });

    return filteredCars;
  }
);

export const selectIsLoadingPagedCatalog = state =>
  state.pagedCatalog.isLoading;
export const selectIsLoadingCatalog = state => state.catalog.isLoading;

export const selectOverallIsLoading = createSelector(
  [selectIsLoadingPagedCatalog, selectIsLoadingCatalog],
  (isLoadingPagedCatalog, isLoadingCatalog) =>
    isLoadingPagedCatalog || isLoadingCatalog
);
