import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../db";

// @desc   Get all restaurants with reviews
// @route  GET /api/v1/restaurants
// @access Public
const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants: QueryResult = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    );
    res.status(200).json({
      status: "success",
      results: restaurants.rows.length,
      data: {
        restaurants: restaurants.rows,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

// @desc   Get a restaurant with reviews
// @route  GET /api/v1/restaurants/:id
// @access Public
const getRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant: QueryResult = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;",
      [id]
    );

    // we get an array of reviews here instead of making another route
    const reviews: QueryResult = await pool.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1;",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

// @desc   Add a restaurant
// @route  POST /api/v1/restaurants
// @access Public
const addRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    const restaurant: QueryResult = await pool.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: restaurant["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

// @desc   Update a restaurant
// @route  PUT /api/v1/restaurants/:id
// @access Public
const updateRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  const { id } = req.params;
  try {
    const restaurant: QueryResult = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

// @desc   Delete a restaurant
// @route  DELETE /api/v1/restaurants/:id
// @access Public
const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant: QueryResult = await pool.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *;",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

export { getRestaurants, getRestaurant, addRestaurant };
