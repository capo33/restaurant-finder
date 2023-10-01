import { Router } from "express";

import * as RestaurantController from "../controllers/RestaurantController";

const router = Router();

router.get("/", RestaurantController.getRestaurants);
router.get("/:id", RestaurantController.getRestaurant);
router.post("/", RestaurantController.addRestaurant);
router.put("/:id", RestaurantController.updateRestaurant);
router.delete("/:id", RestaurantController.deleteRestaurant);
router.post("/:id/addReview", RestaurantController.addReview);
router.put("/:id/updateReview", RestaurantController.updateReview);
router.delete("/:id/deleteReview", RestaurantController.deleteReview);

export default router;
