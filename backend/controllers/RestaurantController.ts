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

 
export { getRestaurants, getRestaurant };
