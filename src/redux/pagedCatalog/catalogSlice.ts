import { createSlice } from "@reduxjs/toolkit";
import { getCars } from "./operations";

import { Item } from "../catalog/catalogSlice";

type pagedCatalogTypes = {
  items: Item[];
  page: number;
  isLoading: boolean;
  error: null | string;
};

const pagedCatalogSlice = createSlice({
  name: "pagedCatalog",
  initialState: {
    items: [],
    page: 1,
    isLoading: false,
    error: null,
  } as pagedCatalogTypes,
  reducers: {
    addPage(state) {
      state.page = state.page + 1;
    },
    clearState(state) {
      state.items = [];
      state.page = 1;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }),
});

export const { addPage, clearState } = pagedCatalogSlice.actions;

export const pagedCatalogReducer = pagedCatalogSlice.reducer;
