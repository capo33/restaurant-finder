import dotenv from "dotenv"
import express, { Application } from "express";
import cors from "cors";
import path from "path";

// Load environment variables from .env file
dotenv.config();
// Routes imports
import restaurantsRouter from "./routes/Restaurant.routes";


// Create instance of express app
const app: Application = express();

// Port number is set in the .env file
const port = process.env.PORT || 3000;

// Middleware & Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the restaurant finder API",
  });
});

// Routes
app.use("/api/v1/restaurants", restaurantsRouter);

// Listen on port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
