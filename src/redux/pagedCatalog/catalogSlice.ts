import { createSlice } from "@reduxjs/toolkit";
import { getCars } from "./operations";

const pagedCatalogSlice = createSlice({
  name: "pagedCatalog",
  initialState: {
    items: [],
    page: 1,
    isLoading: false,
    error: null,
  },
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
      .addCase(getCars.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
      }),
});

export const { addPage, clearState } = pagedCatalogSlice.actions;

export const pagedCatalogReducer = pagedCatalogSlice.reducer;
