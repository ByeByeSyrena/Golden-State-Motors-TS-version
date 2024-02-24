import { RootState } from "../store";

export const selectItems = (state: RootState) => state.pagedCatalog.items;

export const selectPage = (state: RootState) => state.pagedCatalog.page;

export const selectPagedCatalogState = (state: RootState) => state.pagedCatalog;

export const selectIsLoading = (state: RootState) =>
  state.pagedCatalog.isLoading;
