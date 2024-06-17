import { Router } from "express";
import iceboxController from "../controllers/icebox.controller";

const router = Router();

router.get("/:userId", iceboxController.getFoodDataAll);
router.get("/:userId/:foodId", iceboxController.getFoodData);

router.post("/tips", iceboxController.postFoodTips);
router.post("/:userId", iceboxController.postFoodData);

router.put("/:userId/:foodId", iceboxController.putFoodData);

router.delete("/:userId/:foodId", iceboxController.deleteFoodData);

export default router;