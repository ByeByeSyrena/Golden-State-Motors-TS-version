import { createSlice } from "@reduxjs/toolkit";
import { getAllCars } from "./operations";

export interface Item {
  id: number;
  year: number;
  make: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string;
  mileage: number;
}

type initialStateTypes = {
  items: Item[];
  isLoading?: boolean;
  error?: string | null;
};

const catalogInitialState: initialStateTypes = {
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
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }),
});

export const catalogReducer = catalogSlice.reducer;
export const { clearCatalogState } = catalogSlice.actions;
