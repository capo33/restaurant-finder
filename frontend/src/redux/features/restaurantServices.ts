import axios from "axios";

import { API_URL } from "../../constants/constants";

// Get all restaurants
const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data.data.restaurants;
};

// Get a single restaurant
const getRestaurant = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data.restaurant;
};

const restaurantServices = {
  getRestaurants,
  getRestaurant,
};

export default restaurantServices;
