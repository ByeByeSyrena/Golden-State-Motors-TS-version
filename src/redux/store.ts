import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filterReducer } from "./catalog/filterSlice";
import { catalogReducer } from "./catalog/catalogSlice";
import { pagedCatalogReducer } from "./pagedCatalog/catalogSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { favoritesReducer } from "./favorites/favoritesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: "favorites",
  storage,
};

const rootReducer = combineReducers({
  catalog: catalogReducer,
  filter: filterReducer,
  pagedCatalog: pagedCatalogReducer,
  favorites: persistReducer(persistConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
