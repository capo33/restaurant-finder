-- Database
CREATE DATABASE IF NOT EXISTS YelpClone;

-- Tables
-- Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <= 5)  
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5 ),
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id)
);
