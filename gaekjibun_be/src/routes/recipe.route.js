import { Router } from "express";
import recipeController from "../controllers/recipe.controller";

const router = Router();

router.post("/", recipeController.getRecipe);

export default router;
