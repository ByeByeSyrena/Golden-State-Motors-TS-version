import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Item } from "./catalogSlice";

axios.defaults.baseURL = "https://65cbc0f7efec34d9ed880ae5.mockapi.io/cars";

export const getAllCars = createAsyncThunk<Item[]>(
  "catalog/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Item[]> = await axios.get("/catalog");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
