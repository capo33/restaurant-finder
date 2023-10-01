import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import restaurantServices from "./restaurantServices";
import { IRestaurants } from "../../interfaces/restaurantsInterface";

interface IRestaurantState {
  restaurants: IRestaurants[];
  restaurant: IRestaurants | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IRestaurantState = {
  restaurants: [],
  restaurant: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all restaurants
export const getAllRestaurants = createAsyncThunk(
  "restaurants/getAllRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await restaurantServices.getRestaurants();
      return response;
    } catch (error) {
      const axiosError = error as {
        message: string | undefined;
        response?: { data?: { message?: string } };
      };
      const message =
        (axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message) ||
        axiosError.message ||
        axiosError.toString();
      return rejectWithValue(message);
    }
  }
);

// Get a single restaurant
export const getSingleRestaurant = createAsyncThunk(
  "restaurants/getSingleRestaurant",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restaurantServices.getRestaurant(id);
      return response;
    } catch (error) {
      const axiosError = error as {
        message: string | undefined;
        response?: { data?: { message?: string } };
      };
      const message =
        (axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message) ||
        axiosError.message ||
        axiosError.toString();
      return rejectWithValue(message);
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all restaurants
    builder.addCase(getAllRestaurants.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRestaurants.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.restaurants = payload;
    });
    builder.addCase(getAllRestaurants.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get a single restaurant
    builder.addCase(getSingleRestaurant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleRestaurant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.restaurant = payload;
    });
    builder.addCase(getSingleRestaurant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { clearMessage } = restaurantSlice.actions;

export default restaurantSlice.reducer;