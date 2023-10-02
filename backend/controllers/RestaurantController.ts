import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../db";

// @desc   Get all restaurants with reviews
// @route  GET /api/v1/restaurants
// @access Public
const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants: QueryResult = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      results: restaurants.rows.length,
      data: {
        restaurants: restaurants["rows"],
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
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
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
        restaurant: restaurant["rows"][0],
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
    const newRestaurant: QueryResult = await pool.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: newRestaurant["rows"][0],
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
  const { id } = req.params;
  const { name, location, price_range } = req.body;
  try {
    const restaurant: QueryResult = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
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
      data: null,
      // data: {
      //   restaurant: restaurant["rows"][0],
      // },
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

// @desc   Add a review
// @route  POST /api/v1/restaurants/:id/addReview
// @access Public
const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;
  try {
    const newReview: QueryResult = await pool.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, review, rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview["rows"][0],
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

 
// @desc   Update a review
// @route  PUT /api/v1/restaurants/:id/updateReview
// @access Public
const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;
  try {
    const updatedReview: QueryResult = await pool.query(
      "UPDATE reviews SET name = $1, review = $2, rating = $3 WHERE id = $4 RETURNING *;",
      [name, review, rating, id]
    );
    res.status(200).json({
      status: "success",
      data: {
        review: updatedReview["rows"][0],
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

// @desc   Delete a review
// @route  DELETE /api/v1/restaurants/:id/deleteReview
// @access Public
const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedReview: QueryResult = await pool.query(
      "DELETE FROM reviews WHERE id = $1 RETURNING *;",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: {
        review: deletedReview["rows"][0],
      },
    });
  }    
  catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }    
  }
}

export {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addReview,
   updateReview,
  deleteReview,
};
