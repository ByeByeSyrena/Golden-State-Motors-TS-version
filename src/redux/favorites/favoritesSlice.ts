import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../catalog/catalogSlice";

type favoritesTypes = {
  items: Item[];
  error: string | null;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    error: null,
  } as favoritesTypes,
  reducers: {
    clearFavoritesState(state) {
      state.items = [];
      state.error = null;
    },
    addFavorites(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    deleteFavorites(state, action: PayloadAction<number>) {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
  },
});
export const favoritesReducer = favoritesSlice.reducer;

export const { clearFavoritesState, addFavorites, deleteFavorites } =
  favoritesSlice.actions;
