import { Router } from "express";

import * as RestaurantController from "../controllers/RestaurantController";

const router = Router();

router.get("/", RestaurantController.getRestaurants);

router.get("/:id", RestaurantController.getRestaurant);

export default router;
