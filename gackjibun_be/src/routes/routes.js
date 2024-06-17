import { Router } from "express";
import apiRoute from "./api.route";

const router = Router();

router.use("/api", apiRoute);

router.get("/", (req, res) => {
  return res.send("Ziyato🚘");
});

export default router;
