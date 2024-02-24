import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://65cbc0f7efec34d9ed880ae5.mockapi.io/cars/catalog";

export const getCars = createAsyncThunk(
  "pagedCatalog/fetchCars",
  async ({ page }, { rejectWithValue }) => {
    try {
      const url = new URL(baseURL);
      url.searchParams.append("page", page);
      url.searchParams.append("limit", 12);

      const { data } = await axios.get(url.toString());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
