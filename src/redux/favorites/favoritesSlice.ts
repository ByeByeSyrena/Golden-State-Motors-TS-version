import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    clearFavoritesState(state) {
      state.items = [];
      state.error = null;
    },
    addFavorites(state, action) {
      state.items.push(action.payload);
    },
    deleteFavorites(state, action) {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
  },
});
export const favoritesReducer = favoritesSlice.reducer;

export const { clearFavoritesState, addFavorites, deleteFavorites } =
  favoritesSlice.actions;
