import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import restaurantServices from "./restaurantServices";
import { IRestaurants, IReviews, IUpdateRestaurants } from "../../interfaces/restaurantsInterface";

interface IRestaurantState {
  restaurants: IRestaurants[];
  restaurant: {
    restaurant: IRestaurants;
    reviews: IReviews[];
  };
  reviews: IReviews[];
  review: IReviews | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IRestaurantState = {
  restaurants: [],
  restaurant: {
    restaurant: {
      id: 0,
      name: "",
      location: "",
      price_range: 0,
      restaurant_id: "",
      count: 0,
      average_rating: 0,
    },
    reviews: [],
  },
  reviews: [],
  review: null,
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

// Update a restaurant
export const updateRestaurant = createAsyncThunk(
  "restaurants/updateRestaurant",
  async (
    { id, data }: { id: string; data: IUpdateRestaurants },
    { rejectWithValue }
  ) => {
    try {
      const response = await restaurantServices.updateRestaurant(id, data);
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

// Delete a restaurant
export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await restaurantServices.deleteRestaurant(id);
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

// Add a restaurant
export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (restaurant: IRestaurants, { rejectWithValue }) => {
    try {
      const response = await restaurantServices.addRestaurant(restaurant);
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

// Add a review
export const addReview = createAsyncThunk(
  "restaurants/addReview",
  async ({ id, review }: { id: string; review: IReviews }, thunkAPI) => {
    try {
      const response = await restaurantServices.addReview(id, review);
      thunkAPI.dispatch(getSingleRestaurant(id));
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  "restaurants/updateReview",
  async (
    { id, review }: { id: string; review: IReviews },
    { rejectWithValue }
  ) => {
    try {
      const response = await restaurantServices.updateReview(id, review);
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

// Delete a review
export const deleteReview = createAsyncThunk(
  "restaurants/deleteReview",
  async (id: string, thunkAPI) => {
    try {
      const response = await restaurantServices.deleteReview(id);
      console.log("responsealalal", response);
      // thunkAPI.dispatch(getReview(id));
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
      return thunkAPI.rejectWithValue(message);
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
      state.restaurant.restaurant = payload.restaurant;
      state.restaurant.reviews = payload.reviews;
      state.reviews = payload.reviews;
    });
    builder.addCase(getSingleRestaurant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Update a restaurant
    builder.addCase(updateRestaurant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateRestaurant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.restaurant = payload;
    });
    builder.addCase(updateRestaurant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Delete a restaurant
    builder.addCase(deleteRestaurant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRestaurant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.restaurant = payload;
    });
    builder.addCase(deleteRestaurant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Add a restaurant
    builder.addCase(addRestaurant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRestaurant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.restaurant = payload;
    });
    builder.addCase(addRestaurant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Add a review
    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addReview.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.review = payload;
    });
    builder.addCase(addReview.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Update a review
    builder.addCase(updateReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateReview.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.review = payload;
    });
    builder.addCase(updateReview.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Delete a review
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      console.log("payloadssbbbbbbbb", payload);

      state.isLoading = false;
      state.isSuccess = true;
      const index = state.restaurant?.reviews.findIndex(
        (review) => review.id === payload.id
      );
      state.restaurant?.reviews.splice(index, 1);
    });
    builder.addCase(deleteReview.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { clearMessage } = restaurantSlice.actions;

export default restaurantSlice.reducer;
