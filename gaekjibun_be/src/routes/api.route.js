import { Router } from "express";

import recipeRoute from "./recipe.route";
import userRoute from "./user.route";
import iceboxRoute from "./icebox.route";
import alertRoute from "./alert.route";

const router = Router();

router.use("/recipe", recipeRoute);
router.use("/user", userRoute);
router.use("/icebox", iceboxRoute);
router.use("/alert", alertRoute);

export default router;
