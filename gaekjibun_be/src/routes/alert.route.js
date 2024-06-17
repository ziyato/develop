import { Router } from "express";
import alertController from "../controllers/alert.controller";

const router = Router();

router.get("/:userId", alertController.getAlertData);

export default router;
