import axios from "axios";

import { API_URL } from "../../constants/constants";
import {
  IReviews,
  IUpdateORADDRestaurants,
} from "../../interfaces/restaurantsInterface";

// ***************************** RESTAURANT SERVICES ***************************** //
// Get all restaurants
const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data.data.restaurants;
};

// Get a single restaurant
const getRestaurant = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

// Update a restaurant
const updateRestaurant = async (id: string, data: IUpdateORADDRestaurants) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data.data.restaurant;
};

// Delete a restaurant
const deleteRestaurant = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.data.restaurant;
};

// Add a restaurant
const addRestaurant = async (restaurant: IUpdateORADDRestaurants) => {
  const response = await axios.post(API_URL, restaurant);
  return response.data.data.restaurant;
};

// ***************************** REVIEW SERVICES ***************************** //
// Add a review
const addReview = async (id: string, review: IReviews) => {
  const response = await axios.post(`${API_URL}/${id}/addReview`, review);
  return response.data.data.review;
};

// Update a review
const updateReview = async (id: string, review: IReviews) => {
  const response = await axios.put(`${API_URL}/${id}/updateReview`, review);
  return response.data.data.review;
};

// Delete a review
const deleteReview = async (id: string) => {
  const response = await axios.delete(`${API_URL}/deleteReview/${id}`);
  return response.data.data.review;
};

const restaurantServices = {
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addRestaurant,
  addReview,
  updateReview,
  deleteReview,
};

export default restaurantServices;
