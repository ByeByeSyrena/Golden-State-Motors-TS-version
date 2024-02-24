export const selectItems = (state) => state.pagedCatalog.items;

export const selectPage = (state) => state.pagedCatalog.page;

export const selectPagedCatalogState = (state) => state.pagedCatalog;

export const selectIsLoading = (state) => state.pagedCatalog.isLoading;
