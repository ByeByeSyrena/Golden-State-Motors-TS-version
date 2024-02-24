import { createSlice } from "@reduxjs/toolkit";
import { getAllCars } from "./operations";

const catalogInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState: catalogInitialState,
  reducers: {
    clearCatalogState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCars.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllCars.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const catalogReducer = catalogSlice.reducer;
export const { clearCatalogState } = catalogSlice.actions;
