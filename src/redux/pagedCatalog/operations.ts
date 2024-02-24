import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../catalog/catalogSlice";

type GetCarsPayload = {
  page: number;
};

const baseURL = "https://65cbc0f7efec34d9ed880ae5.mockapi.io/cars/catalog";

export const getCars = createAsyncThunk<Item[], GetCarsPayload>(
  "pagedCatalog/fetchCars",
  async ({ page }, { rejectWithValue }) => {
    try {
      const url = new URL(baseURL);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", "12");

      const { data } = await axios.get(url.toString());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
