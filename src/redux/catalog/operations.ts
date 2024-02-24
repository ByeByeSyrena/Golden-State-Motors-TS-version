import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://65cbc0f7efec34d9ed880ae5.mockapi.io/cars";

export const getAllCars = createAsyncThunk(
  "catalog/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/catalog");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
