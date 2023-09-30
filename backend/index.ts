import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Create instance of express app
const app: Application = express();

// Middleware & Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
