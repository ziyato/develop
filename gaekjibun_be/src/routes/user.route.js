import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/:userId", userController.userProfile);

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignup);

router.put("/:userId", userController.putUserProfile);

export default router;
