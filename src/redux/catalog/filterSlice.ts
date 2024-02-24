import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = {
  make: "",
  mileage: "",
  rentalPrice: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setFilterOption: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilter: (state) => {
      return { ...filterInitialState };
    },
  },
});

export const {
  actions: { setFilterOption, resetFilter },
  reducer: filterReducer,
} = filterSlice;
