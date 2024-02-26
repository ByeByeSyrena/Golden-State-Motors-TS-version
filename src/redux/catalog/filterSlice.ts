import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type filterStateTypes = {
  make: string;
  mileage: string | number[];
  rentalPrice: string | number;
};

const filterInitialState: filterStateTypes = {
  make: "",
  mileage: "",
  rentalPrice: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setFilterOption: (
      state,
      action: PayloadAction<Partial<filterStateTypes>>
    ) => {
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
